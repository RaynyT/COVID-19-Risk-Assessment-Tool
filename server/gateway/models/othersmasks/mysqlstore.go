package othersmasks

import (
	"database/sql"
	"strings"
)


// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "OtherMasksID"
	Name GetByType = "OtherMasksName"
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

// getByProvidedType gets a specific otherMasks given the provided type.
// This requires the GetByType to be "unique" in the database - hence OtherMasksID and OtherMasksName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*OtherMasks, error) {
	sel := string("SELECT OtherMasksID, RiskCoefficient, OtherMasksName FROM TblOtherMasks WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	otherMasks := &OtherMasks{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&otherMasks.OtherMasksID,
		&otherMasks.RiskCoefficient,
		&otherMasks.OtherMasksName); err != nil {
		return nil, err
	}
	return otherMasks, nil
}

//GetByID returns the OtherMasks with the given ID
func (ms *MySQLStore) GetByID(id int64) (*OtherMasks, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the OtherMasks with the Name
func (ms *MySQLStore) GetByName(name string) (*OtherMasks, error) {
	return ms.getByProvidedType(Name, name)
}

// Gets all surveys based on a given:
// Risk Coefficient
func (ms *MySQLStore) AllOthersMasks(rc float64) (*[]OtherMasks, error) {
	sel := string("SELECT OtherMasksID, RiskCoefficient, OtherMasksName FROM TblOtherMasks WHERE RiskCoefficient = ?")

	rows, err := ms.Database.Query(sel, rc)
	var othersMasks []OtherMasks

	for rows.Next() {
		var otherMasks OtherMasks
		err = rows.Scan(&otherMasks.OtherMasksID, &otherMasks.RiskCoefficient, &otherMasks.OtherMasksName)
		
		if err != nil {
			return nil, err
		}
		surveys = append(othersMasks, otherMasks)
	}

	return &othersMasks, nil
}