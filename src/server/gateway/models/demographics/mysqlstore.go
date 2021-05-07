package demographics

import (
	"database/sql"
	"time"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "DemographicID"
	UserID GetByType = "UserID"
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

// getByProvidedType gets a specific demographic given the provided type.
// This requires the GetByType to be "unique" in the database - hence DemographicID and UserID
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*Demographic, error) {
	sel := string("SELECT DemographicID, UserID, StateCountyID, VaccineTypeID, UserUpdateDate FROM TblDemographic WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	demographic := &Demographic{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&demographic.DemographicID,
		&demographic.UserID,
		&demographic.StateCountyID,
		&demographic.VaccineTypeID,
		&demographic.UserUpdateDate); err != nil {
		return nil, err
	}
	return demographic, nil
}

//GetByID returns the Demographic with the given ID
func (ms *MySQLStore) GetByID(id int64) (*Demographic, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByUser returns the Demographic with the given UserID
func (ms *MySQLStore) GetByName(userid int64) (*Demographic, error) {
	return ms.getByProvidedType(UserID, userid)
}

//Insert inserts the demographic into the database, and returns
//the newly-inserted Demographic, complete with the DBMS-assigned DemographicID
func (ms *MySQLStore) Insert(demographic *Demographic) (*Demographic, error) {
	ins := string("INSERT INTO TblDemographic(UserID, StateCountyID, VaccineTypeID, UserUpdateDate) VALUES(?,?,?,?)")
	t = time.Now().Format("01-02-2006")
	res, err := ms.Database.Exec(ins, demographic.UserID, demographic.StateCountyID, demographic.VaccineTypeID, t)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	demographic.DemographicID = lid
	return demographic, nil
}

//Delete deletes the demographic with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblDemographic WHERE DemographicID = ?")
	res, err := ms.Database.Exec(del, id)
	if err != nil {
		return err
	}

	rowsAffected, rowsAffectedErr := res.RowsAffected()
	if rowsAffectedErr != nil {
		return rowsAffectedErr
	}

	if rowsAffected != 1 {
		return ErrDemographicNotFound
	}

	return nil
}

// Gets all demographics based on a given:
// StateCountyID and VaccineTypeID
func (ms *MySQLStore) AllDemographics(id int64, column string) (*[]Demographic, error) {
	sel := string("SELECT DemographicID, UserID, StateCountyID, VaccineTypeID, UserUpdateDate FROM TblDemographic WHERE " + column + " = ?")

	rows, err := ms.Database.Query(sel, id)
	var demographics []Demographic

	for rows.Next() {
		var demographic Demographic
		err = rows.Scan(&demographic.DemographicID, &demographic.DemographicTypeID, &demographic.VolumeID, &demographic.InOutID, &demographic.DistanceID, &demographic.SelfMaskID, &demographic.OtherMasksID, &demographic.DemographicName, &demographic.NumPeople, &demographic.NumPeopleMasks, &demographic.DurationHours, &demographic.DurationMinutes)
		
		if err != nil {
			return nil, err
		}
		demographics = append(demographics, demographic)
	}

	return &demographics, nil
}