package counties

import (
	"database/sql"
	"time"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "CountyID"
	Name GetByType = "CountyName"
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
// ----------------
CountyID	int64	`json:"countyID"`
CountyName	string	`json:"countyName"`

// getByProvidedType gets a specific county given the provided type.
// This requires the GetByType to be "unique" in the database - hence CountyID and CountyName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*County, error) {
	sel := string("SELECT CountyID, CountyName FROM TblCounty WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	county := &County{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&county.CountyID,
		&county.CountyName); err != nil {
		return nil, err
	}
	return county, nil
}

//GetByID returns the Activity with the given ID
func (ms *MySQLStore) GetByID(id int64) (*County, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the Activity with the given Name
func (ms *MySQLStore) GetByName(name string) (*County, error) {
	return ms.getByProvidedType(Name, name)
}

//Insert inserts the county into the database, and returns
//the newly-inserted county, complete with the DBMS-assigned CountyID
func (ms *MySQLStore) Insert(county *County) (*County, error) {
	ins := string("INSERT INTO TblCounty(CountyName) VALUES(?)")
	res, err := ms.Database.Exec(ins, county.CountyName)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	county.CountyID = lid
	return county, nil
}

//Delete deletes the county with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblCounty WHERE CountyID = ?")
	res, err := ms.Database.Exec(del, id)
	if err != nil {
		return err
	}

	rowsAffected, rowsAffectedErr := res.RowsAffected()
	if rowsAffectedErr != nil {
		return rowsAffectedErr
	}

	if rowsAffected != 1 {
		return ErrActivityNotFound
	}

	return nil
}
