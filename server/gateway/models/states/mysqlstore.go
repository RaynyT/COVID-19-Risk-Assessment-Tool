package states

import (
	"database/sql"
	"strings"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "StateID"
	Abbr GetByType = "StateAbbr"
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

// getByProvidedType gets a specific state given the provided type.
// This requires the GetByType to be "unique" in the database - hence StateID and StateName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*State, error) {
	sel := string("SELECT StateID, StateAbbr FROM TblState WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	state := &State{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&state.StateID,
		&state.StateAbbr); err != nil {
		return nil, err
	}
	return state, nil
}

//GetByID returns the Activity with the given ID
func (ms *MySQLStore) GetByID(id int64) (*State, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the Activity with the given Name
func (ms *MySQLStore) GetByAbbr(abbr string) (*State, error) {
	return ms.getByProvidedType(Abbr, abbr)
}