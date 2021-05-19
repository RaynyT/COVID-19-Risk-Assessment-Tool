package inouts

import (
	"database/sql"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "InOutID"
	Name GetByType = "InOutName"
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
// This requires the GetByType to be "unique" in the database - hence InOutID and InOutName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*InOut, error) {
	sel := string("SELECT InOutID, RiskCoefficient, InOutName FROM TblInOut WHERE LOWER(" + t + ") = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	inOut := &InOut{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&inOut.InOutID,
		&inOut.RiskCoefficient,
		&inOut.InOutName); err != nil {
		return nil, err
	}
	return inOut, nil
}

//GetByID returns the InOut with the given ID
func (ms *MySQLStore) GetByID(id int64) (*InOut, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the InOut with the Name
func (ms *MySQLStore) GetByName(name string) (*InOut, error) {
	return ms.getByProvidedType(Name, name)
}

// Gets all inOuts based on a given:
// Risk Coefficient
func (ms *MySQLStore) AllInOuts(rc float64) (*[]InOut, error) {
	sel := string("SELECT InOutID, RiskCoefficient, InOutName FROM TblInOut WHERE RiskCoefficient = ?")

	rows, err := ms.Database.Query(sel, rc)
	var inOuts []InOut

	for rows.Next() {
		var inOut InOut
		err = rows.Scan(&inOut.InOutID, &inOut.RiskCoefficient, &inOut.InOutName)
		
		if err != nil {
			return nil, err
		}
		inOuts = append(inOuts, inOut)
	}

	return &inOuts, nil
}