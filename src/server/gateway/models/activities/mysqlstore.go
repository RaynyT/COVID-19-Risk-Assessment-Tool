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
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*Activity, error) {
	sel := string("SELECT ActivityID, VolumeID, InOutID, DistanceID, SelfMaskID, OtherMasksID, ActivityName, NumPeople, NumPeopleMasks, DurationHours, DurationMinutes FROM TblActivity WHERE " + t + " = ?")

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

//GetByID returns the Activity with the given ID
func (ms *MySQLStore) GetByID(id int64) (*Activity, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the Activity with the given Name
func (ms *MySQLStore) GetByName(name string) (*Activity, error) {
	return ms.getByProvidedType(Name, name)
}

//Insert inserts the activity into the database, and returns
//the newly-inserted Activity, complete with the DBMS-assigned ActivityID
func (ms *MySQLStore) Insert(activity *Activity) (int64, error) {
	ins := string("INSERT INTO TblActivity(VolumeID, InOutID, DistanceID, SelfMaskID, OtherMasksID, ActivityName, NumPeople, NumPeopleMasks, DurationHours, DurationMinutes) VALUES(?,?,?,?,?,?,?,?,?,?)")
	res, err := ms.Database.Exec(ins, activity.VolumeID, activity.InOutID, activity.DistanceID, activity.SelfMaskID, activity.OtherMasksID, activity.ActivityName, activity.NumPeople, activity.NumPeopleMasks, activity.DurationHours, activity.DurationMinutes)
	if err != nil {
		return -1, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return -1, lidErr
	}

	activity.ActivityID = lid
	return lid, nil
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

type ActID struct {
	ID int64
}

func (ms *MySQLStore) Exists(act *Activity) (int64, error) {
	sel := string("SELECT ActivityID WHERE VolumeID = ? AND InOutID = ? AND DistanceID = ? AND SelfMaskID = ? AND OtherMasksID = ? AND ActivityName = ? AND NumPeople = ? AND NumPeopleMasks = ? AND DurationHours  = ? AND DurationMinutes = ?")

	rows, err := ms.Database.Query(sel, act.VolumeID, act.InOutID, act.DistanceID, act.SelfMaskID, act.OtherMasksID, act.ActivityName, act.NumPeople, act.NumPeopleMasks, act.DurationHours, act.DurationMinutes)
	if err != nil {
		return -1, err
	}
	defer rows.Close()

	id := &ActID{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&id.ID); err != nil {
		return -1, err
	}
	return id.ID, nil
}