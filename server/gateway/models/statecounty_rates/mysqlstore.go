package statecounty_rates

import (
	"database/sql"
	"time"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "StateCountyRateID"
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

// getByProvidedType gets a specific stateCounty_Rate given the provided type.
// This requires the GetByType to be "unique" in the database - hence StateCounty_RateID and UserID
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*StateCounty_Rate, error) {
	sel := string("SELECT StateCountyRateID, StateCountyID, Uploaded, PosTestRateCounty, NumNewCasesLastWeek, NumNewCasesPrevToLastWeek FROM TblStateCounty_Rate WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stateCounty_Rate := &StateCounty_Rate{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&stateCounty_Rate.StateCountyRateID,
		&stateCounty_Rate.StateCountyID,
		&stateCounty_Rate.Uploaded,
		&stateCounty_Rate.PosTestRateCounty,
		&stateCounty_Rate.NumNewCasesLastWeek,
		&stateCounty_Rate.NumNewCasesPrevToLastWeek); err != nil {
		return nil, err
	}
	return stateCounty_Rate, nil
}

//GetByID returns the StateCounty_Rate with the given ID
func (ms *MySQLStore) GetByID(id int64) (*StateCounty_Rate, error) {
	return ms.getByProvidedType(ID, id)
}

//Insert inserts the stateCounty_Rate into the database, and returns
//the newly-inserted StateCounty_Rate, complete with the DBMS-assigned StateCounty_RateID
func (ms *MySQLStore) Insert(stateCounty_Rate *StateCounty_Rate) (*StateCounty_Rate, error) {
	ins := string("INSERT INTO TblStateCounty_Rate(StateCountyID, Uploaded, PosTestRateCounty, NumNewCasesLastWeek, NumNewCasesPrevToLastWeek) VALUES(?,?,?,?,?)")
	t = time.Now().Format("01-02-2006")
	res, err := ms.Database.Exec(ins, stateCounty_Rate.StateCountyID, t, stateCounty_Rate.PosTestRateCounty, stateCounty_Rate.NumNewCasesLastWeek, stateCounty_Rate.NumNewCasesPrevToLastWeek)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	stateCounty_Rate.StateCountyRateID = lid
	return stateCounty_Rate, nil
}

//Delete deletes the stateCounty_Rate with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblStateCounty_Rate WHERE StateCountyRateID = ?")
	res, err := ms.Database.Exec(del, id)
	if err != nil {
		return err
	}

	rowsAffected, rowsAffectedErr := res.RowsAffected()
	if rowsAffectedErr != nil {
		return rowsAffectedErr
	}

	if rowsAffected != 1 {
		return ErrStateCounty_RateNotFound
	}

	return nil
}

// Gets the most recent stateCounty_Rate based on a given:
// StateCountyID
func (ms *MySQLStore) AllStateCounty_Rates(id int64) (*StateCounty_Rate, error) {
	sel := string("SELECT StateCountyRateID, StateCountyID, Uploaded, PostTestRateCounty, NumNewCasesLastWeek, NumNewCasesPrevToLastWeek FROM TblStateCounty_Rate WHERE StateCountyID = ? ORDER BY STR_TO_DATE(Uploaded, '%d-%m-%Y') DESC LIMIT 1")

	rows, err := ms.Database.Query(sel, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stateCounty_Rate := &StateCounty_Rate{}

	rows.Next()
	if err:= rows.Scan(
		&stateCounty_Rate.StateCountyRateID,
		&stateCounty_Rate.StateCountyID,
		&stateCounty_Rate.Uploaded,
		&stateCounty_Rate.PosTestRateCounty,
		&stateCounty_Rate.NumNewCasesLastWeek,
		&stateCounty_Rate.NumNewCasesPrevToLastWeek); err != nil {
		return nil, err
	}
	return stateCounty_Rate, nil
}