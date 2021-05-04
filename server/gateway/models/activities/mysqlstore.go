package activities

import (
	"database/sql"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "ActivityID"
	Name GetByType = "ActivityName"
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

// getByProvidedType gets a specific activity given the provided type.
// This requires the GetByType to be "unique" in the database - hence ActivityID and ActivityName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*Class, error) {
	sel := string("SELECT ActivityID, ActivityTypeID, VolumeID, InOutID, DistanceID, SelfMaskID, OtherMasksID, ActivityName, NumPeople, NumPeopleMasks, DurationHours, DurationMinutes FROM TblActivity WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	activity := &Activity{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&activity.ActivityID,
		&activity.ActivityTypeID,
		&activity.VolumeID,
		&activity.InOutID,
		&activity.DistanceID,
		&activity.SelfMaskID,
		&activity.OtherMasksID,
		&activity.ActivityName,
		&activity.NumPeople,
		&activity.NumPeopleMasks,
		&activity.DurationHours,
		&activity.DurationMinutes); err != nil {
		return nil, err
	}
	return activity, nil
}

//GetByID returns the Class with the given ID
func (ms *MySQLStore) GetByID(id int64) (*Activity, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the Class with the given Name
func (ms *MySQLStore) GetByName(name string) (*Activity, error) {
	return ms.getByProvidedType(Name, name)
}

//Insert inserts the activity into the database, and returns
//the newly-inserted Activity, complete with the DBMS-assigned ActivityID
func (ms *MySQLStore) Insert(activity *Activity) (*Activity, error) {
	ins := string("INSERT INTO TblActivity(ActivityTypeID, VolumeID, InOutID, DistanceID, SelfMaskID, OtherMasksID, ActivityName, NumPeople, NumPeopleMasks, DurationHours, DurationMinutes) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
	res, err := ms.Database.Exec(ins, activity.ActivityTypeID, activity.VolumeID, activity.InOutID, activity.DistanceID, activity.SelfMaskID, activity.OtherMasksID, activity.ActivityName, activity.NumPeople, activity.NumPeopleMasks, activity.DurationHours, activity.DurationMinutes)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	activity.ActivityID = lid
	return class, nil
}

//Delete deletes the activity with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblActivity WHERE ActivityID = ?")
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

// Gets all activities based on a given activity type
func (ms *MySQLStore) AllActivities(id int64) (*[]Activity, error) {
	sel := string("SELECT ActivityID, ActivityTypeID, VolumeID, InOutID, DistanceID, SelfMaskID, OtherMasksID, ActivityName, NumPeople, NumPeopleMasks, DurationHours, DurationMinutes FROM TblActivity WHERE ActivityTypeID = ?")

	rows, err := ms.Database.Query(sel, id)
	var activities []Activity

	for rows.Next() {
		var activity Activity
		err = rows.Scan(&activity.ActivityID, &activity.ActivityTypeID, &activity.VolumeID, &activity.InOutID, &activity.DistanceID, &activity.SelfMaskID, &activity.OtherMasksID, &activity.ActivityName, &activity.NumPeople, &activity.NumPeopleMasks, &activity.DurationHours, &activity.DurationMinutes)
		
		if err != nil {
			return nil, err
		}
		activities = append(activities, activity)
	}

	return &activities, nil
}