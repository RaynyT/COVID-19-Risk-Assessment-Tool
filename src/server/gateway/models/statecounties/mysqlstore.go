package statecounties

import (
	"database/sql"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "StateCountyID"
	FIPS GetByType = "FIPS"
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

// getByProvidedType gets a specific stateCounty given the provided type.
// This requires the GetByType to be "unique" in the database - hence StateCountyID and StateCountyName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*StateCounty, error) {
	sel := string("SELECT StateCountyID, RiskCoefficient, StateCountyName FROM TblStateCounty WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stateCounty := &StateCounty{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&stateCounty.StateCountyID,
		&stateCounty.StateID,
		&stateCounty.CountyID,
		&stateCounty.Pop,
		&stateCounty.FIPS); err != nil {
		return nil, err
	}
	return stateCounty, nil
}

//GetByID returns the StateCounty with the given ID
func (ms *MySQLStore) GetByID(id int64) (*StateCounty, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByID returns the StateCounty with the given FIPS
func (ms *MySQLStore) GetByFIPS(fips string) (*StateCounty, error) {
	return ms.getByProvidedType(FIPS, fips)
}

// Gets all stateCounties based on a given:
// StateID and CountyID
func (ms *MySQLStore) StateCounty(s_id int64, c_id int64) (*StateCounty, error) {
	sel := string("SELECT StateCountyID, StateID, CountyID, Pop, FIPS FROM TblStateCounty WHERE StateID = ? AND CountyID = ?")

	rows, err := ms.Database.Query(sel, s_id, c_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stateCounty := &StateCounty{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&stateCounty.StateCountyID,
		&stateCounty.StateID,
		&stateCounty.CountyID,
		&stateCounty.Pop,
		&stateCounty.FIPS); err != nil {
		return nil, err
	}
	return stateCounty, nil
}

// Gets all counties in a state based on a given:
// StateID
func (ms *MySQLStore) AllStateCounties(s_id int64) (*[]StateCounty, error) {
	sel := string("SELECT StateCountyID, StateID, CountyID, Pop, FIPS FROM TblStateCounty WHERE StateID = ?")

	rows, err := ms.Database.Query(sel, s_id)
	var stateCounties []StateCounty

	for rows.Next() {
		var stateCounty StateCounty
		err = rows.Scan(&stateCounty.StateCountyID, &stateCounty.StateID, &stateCounty.CountyID, &stateCounty.Pop, &stateCounty.FIPS)
		
		if err != nil {
			return nil, err
		}
		stateCounties = append(stateCounties, stateCounty)
	}

	return &stateCounties, nil
}