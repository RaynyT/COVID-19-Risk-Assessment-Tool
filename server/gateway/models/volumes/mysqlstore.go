package volumes

import (
	"database/sql"
	"time"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "VolumeID"
	Name GetByType = "VolumeName"
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

// getByProvidedType gets a specific volume given the provided type.
// This requires the GetByType to be "unique" in the database - hence VolumeID and VolumeName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*Volume, error) {
	sel := string("SELECT VolumeID, RiskCoefficient, VolumeName FROM TblVolume WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	volume := &Volume{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&volume.VolumeID,
		&volume.RiskCoefficient,
		&volume.VolumeName); err != nil {
		return nil, err
	}
	return volume, nil
}

//GetByID returns the Volume with the given ID
func (ms *MySQLStore) GetByID(id int64) (*Volume, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the Volume with the Name
func (ms *MySQLStore) GetByName(name string) (*Volume, error) {
	return ms.getByProvidedType(Name, name)
}

// Gets all surveys based on a given:
// Risk Coefficient
func (ms *MySQLStore) AllVolumes(rc float64) (*[]Volume, error) {
	sel := string("SELECT VolumeID, RiskCoefficient, VolumeName FROM TblVolume WHERE RiskCoefficient = ?")

	rows, err := ms.Database.Query(sel, rc)
	var volumes []Volume

	for rows.Next() {
		var volume Volume
		err = rows.Scan(&volume.VolumeID, &volume.RiskCoefficient, &volume.VolumeName)
		
		if err != nil {
			return nil, err
		}
		surveys = append(volumes, volume)
	}

	return &volumes, nil
}