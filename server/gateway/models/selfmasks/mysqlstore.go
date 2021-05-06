package selfmasks

import (
	"database/sql"
	"strings"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "SelfMaskID"
	Name GetByType = "SelfMaskName"
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

// getByProvidedType gets a specific selfMask given the provided type.
// This requires the GetByType to be "unique" in the database - hence SelfMaskID and SelfMaskName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*SelfMask, error) {
	sel := string("SELECT SelfMaskID, RiskCoefficient, SelfMaskName FROM TblSelfMask WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	selfMask := &SelfMask{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&selfMask.SelfMaskID,
		&selfMask.RiskCoefficient,
		&selfMask.SelfMaskName); err != nil {
		return nil, err
	}
	return selfMask, nil
}

//GetByID returns the SelfMask with the given ID
func (ms *MySQLStore) GetByID(id int64) (*SelfMask, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the SelfMask with the Name
func (ms *MySQLStore) GetByName(name string) (*SelfMask, error) {
	return ms.getByProvidedType(Name, name)
}

// Gets all surveys based on a given:
// Risk Coefficient
func (ms *MySQLStore) AllSelfMasks(rc float64) (*[]SelfMask, error) {
	sel := string("SELECT SelfMaskID, RiskCoefficient, SelfMaskName FROM TblSelfMask WHERE RiskCoefficient = ?")

	rows, err := ms.Database.Query(sel, rc)
	var selfMasks []SelfMask

	for rows.Next() {
		var selfMask SelfMask
		err = rows.Scan(&selfMask.SelfMaskID, &selfMask.RiskCoefficient, &selfMask.SelfMaskName)
		
		if err != nil {
			return nil, err
		}
		surveys = append(selfMasks, selfMask)
	}

	return &selfMasks, nil
}