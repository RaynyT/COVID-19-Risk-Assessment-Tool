package users

import (
	"database/sql"
	"strings"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "UserID"
	CookieHash GetByType = "CookieHash"
)

// MySQLStore is a user.Store backed by MySQL
type MySQLStore struct {
	Database *sql.DB
}

// NewMySQLStore constructs a new MySQLStore, and returns an error
// if there is a problem along the way.
func NewMySQLStore(dataSourceName string) (*MySQLStore, error) {
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		return nil, err
	}

	return &MySQLStore{db}, nil
}

// getByProvidedType gets a specific user given the provided type.
// This requires the GetByType to be "unique" in the database - hence UserID and UserID
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*User, error) {
	sel := string("SELECT UserID, CookieHash FROM TblUser WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	user := &User{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&user.UserID,
		&user.UserID,
		&user.StateCountyID,
		&user.VaccineTypeID,
		&user.UserUpdateDate); err != nil {
		return nil, err
	}
	return user, nil
}

//GetByID returns the User with the given ID
func (ms *MySQLStore) GetByID(id int64) (*User, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByCookieHash returns the User with the given UserID
func (ms *MySQLStore) GetByCookieHash(ch string) (*User, error) {
	return ms.getByProvidedType(CookieHash, ch)
}

//Insert inserts the user into the database, and returns
//the newly-inserted User, complete with the DBMS-assigned UserID
func (ms *MySQLStore) Insert(user *User) (*User, error) {
	ins := string("INSERT INTO TblUser(CookieHash) VALUES(?)")
	res, err := ms.Database.Exec(ins, user.CookieHash)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	user.UserID = lid
	return user, nil
}

//Delete deletes the user with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblUser WHERE UserID = ?")
	res, err := ms.Database.Exec(del, id)
	if err != nil {
		return err
	}

	rowsAffected, rowsAffectedErr := res.RowsAffected()
	if rowsAffectedErr != nil {
		return rowsAffectedErr
	}

	if rowsAffected != 1 {
		return ErrUserNotFound
	}

	return nil
}