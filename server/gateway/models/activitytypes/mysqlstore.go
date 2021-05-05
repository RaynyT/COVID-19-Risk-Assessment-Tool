package activitytypes

import (
	"database/sql"
	"time"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "ActivityTypeID"
	Name GetByType = "ActivityTypeName"
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

// -----

// getByProvidedType gets a specific activity given the provided type.
// This requires the GetByType to be "unique" in the database - hence ActivityID and ActivityName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*ActivityType, error) {
	sel := string("SELECT ActivityTypeID, ActivityTypeName, ActivityTypeDescr, InitialActivity FROM TblActivityType WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	activityType := &ActivityType{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&activityType.ActivityTypeID,
		&activityType.ActivityTypeName,
		&activityType.ActivityTypeDescr,
		&activityType.InitialActivity); err != nil {
		return nil, err
	}
	return activityType, nil
}

//GetByID returns the ActivityType with the given ID
func (ms *MySQLStore) GetByID(id int64) (*ActivityType, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the ActivityType with the Name
func (ms *MySQLStore) GetByName(name string) (*ActivityType, error) {
	return ms.getByProvidedType(Name, name)
}

//Insert inserts the activityType into the database, and returns
//the newly-inserted ActivityType, complete with the DBMS-assigned ActivityTypeID
func (ms *MySQLStore) Insert(activityType *ActivityType) (*ActivityType, error) {
	ins := string("INSERT INTO TblActivityType(ActivityTypeName, ActivityTypeDescr, InitialActivity) VALUES(?,?,?,?)")
	res, err := ms.Database.Exec(ins, activityType.ActivityTypeName, activityType.ActivityTypeDescr, activityType.InitialActivity)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	activity.ActivityTypeID = lid
	return activityType, nil
}

//Delete the activityType with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblActivityType WHERE ActivityTypeID = ?")
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
