package statecounty_rates

import (
	"database/sql"
	"errors"
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
	sel := string("SELECT StateCountyRateID, StateCountyID, Uploaded, PosTestRateCounty, NumNewCases FROM TblStateCounty_Rate WHERE " + t + " = ?")

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
		&stateCounty_Rate.NumNewCases); err != nil {
		return nil, err
	}
	return stateCounty_Rate, nil
}

//GetByID returns the StateCounty_Rate with the given ID
func (ms *MySQLStore) GetByID(id int64) (*StateCounty_Rate, error) {
	return ms.getByProvidedType(ID, id)
}

// Gets the most recent stateCounty_Rate based on a given:
// For front end we will return aggregated total num of cases for last week divided by
// total num of cases for week before last week, and the positive test rate for yesterday
// StateCountyID
// float64 = (num new cases last week / num new cases prev to last week) * posTestRate
func (ms *MySQLStore) AggregatedStateCounty_Rates(id int64) (float64, float64, error) {
	// Query should get positive test rate for yesterday
	sel := string("SELECT StateCountyRateID, StateCountyID, Uploaded, PosTestRateCounty, NumNewCases FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded = SUBDATE(NOW(),1)")

	rows, err := ms.Database.Query(sel, id)

	if err == sql.ErrNoRows {
		return -1, -1, errors.New("No rows returned for PosTestRateCounty.")
	}
	
	if err != nil {
		return -1, -1, err
	}
	defer rows.Close()

	stateCounty_Rate := &StateCounty_Rate{}

	rows.Next()
	if err := rows.Scan(
		&stateCounty_Rate.StateCountyRateID,
		&stateCounty_Rate.StateCountyID,
		&stateCounty_Rate.Uploaded,
		&stateCounty_Rate.PosTestRateCounty,
		&stateCounty_Rate.NumNewCases); err != nil {
		return -1, -1, err
	}
	

	// Query should get total new cases for last week from yesterday
	last, err := ms.HelperAggregator(id, "last")
	if err != nil {
		return -1, -1, err
	}
	// Query should get total new cases for week before last week from yesterday
	prevToLast, err := ms.HelperAggregator(id, "prevToLast")
	if err != nil {
		return -1, -1, err
	}

	// Compute quotient, if quotient is less than 2, the min is now 2
	delayFactor := last / prevToLast
	if delayFactor < 2 {
		delayFactor = 2
	}
	// Return positive test rate and delay factor
	return float64(stateCounty_Rate.PosTestRateCounty), float64(delayFactor), nil
}

// Function that aggregates total number of new cases
func (ms *MySQLStore) HelperAggregator(id int64, week string) (int64, error) {
	var sel string
	if week == "last" {
		sel = string("SELECT StateCountyRateID, StateCountyID, Uploaded, PosTestRateCounty, NumNewCases FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded BETWEEN SUBDATE(NOW(),8) AND SUBDATE(NOW(),14)")
	} else if week == "prevToLast" {
		sel = string("SELECT StateCountyRateID, StateCountyID, Uploaded, PosTestRateCounty, NumNewCases FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded BETWEEN SUBDATE(NOW(),15) AND SUBDATE(NOW(),21)")
	}

	rows, err := ms.Database.Query(sel, id)

	if err == sql.ErrNoRows {
		return -1, errors.New("No rows for that week.")
	}

	if err != nil {
		return -1, err
	}
	defer rows.Close()

	var total int64

	for rows.Next() {
		var stateCounty_Rate StateCounty_Rate
		err := rows.Scan(&stateCounty_Rate.StateCountyRateID, &stateCounty_Rate.StateCountyID, 
						 &stateCounty_Rate.Uploaded, &stateCounty_Rate.PosTestRateCounty, &stateCounty_Rate.NumNewCases)
		
		if err != nil {
			return -1, err
		}

		total = total + stateCounty_Rate.NumNewCases
	}
	if total == 0 {
		return 1, nil
	} else {
		return total, nil
	}
}