package distances

import (
	"database/sql"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "DistanceID"
	Name GetByType = "DistanceName"
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
// This requires the GetByType to be "unique" in the database - hence DistanceID and DistanceName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*Distance, error) {
	sel := string("SELECT DistanceID, RiskCoefficient, DistanceName FROM TblDistance WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	distance := &Distance{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&distance.DistanceID,
		&distance.RiskCoefficient,
		&distance.DistanceName); err != nil {
		return nil, err
	}
	return distance, nil
}

//GetByID returns the Distance with the given ID
func (ms *MySQLStore) GetByID(id int64) (*Distance, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the Distance with the Name
func (ms *MySQLStore) GetByName(name string) (*Distance, error) {
	return ms.getByProvidedType(Name, name)
}

// Gets all surveys based on a given:
// Risk Coefficient
func (ms *MySQLStore) AllDistances(rc float64) (*[]Distance, error) {
	sel := string("SELECT DistanceID, RiskCoefficient, DistanceName FROM TblDistance WHERE RiskCoefficient = ?")

	rows, err := ms.Database.Query(sel, rc)
	var distances []Distance

	for rows.Next() {
		var distance Distance
		err = rows.Scan(&distance.DistanceID, &distance.RiskCoefficient, &distance.DistanceName)
		
		if err != nil {
			return nil, err
		}
		surveys = append(distances, distance)
	}

	return &distances, nil
}