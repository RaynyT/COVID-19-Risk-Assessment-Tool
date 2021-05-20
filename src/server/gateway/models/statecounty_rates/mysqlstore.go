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
func (ms *MySQLStore) AggregatedStateCounty_Rates(id int64) (float64, float64, int64, error) {
	// Query should get positive test rate for yesterday
	sel := string("SELECT StateCountyRateID, StateCountyID, Uploaded, PosTestRateCounty, NumNewCases FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded = SUBDATE(CURDATE(),1)")

	row := ms.Database.QueryRow(sel, id)

	stateCounty_Rate := &StateCounty_Rate{}

	if err := row.Scan(
		&stateCounty_Rate.StateCountyRateID,
		&stateCounty_Rate.StateCountyID,
		&stateCounty_Rate.Uploaded,
		&stateCounty_Rate.PosTestRateCounty,
		&stateCounty_Rate.NumNewCases); err != nil {
		return -1, -1, -1, err
	}

	// Query should get total new cases for last week from yesterday
	last, err := ms.HelperAggregator(id, "last")
	if err != nil {
		return -1, -1, -1, err
	}
	// Query should get total new cases for week before last week from yesterday
	prevToLast, err := ms.HelperAggregator(id, "prevToLast")
	if err != nil {
		return -1, -1, -1, err
	}

	// Compute quotient, if quotient is more than 2, the min is now 2
	delayFactor := float64(last / prevToLast)
	if delayFactor > 2.0 {
		delayFactor = 2.0
	}
	// Return positive test rate and delay factor
	return float64(stateCounty_Rate.PosTestRateCounty), delayFactor, last, nil
}

type Total struct {
	Tot int64
}

// Function that aggregates total number of new cases
func (ms *MySQLStore) HelperAggregator(id int64, week string) (int64, error) {
	var sel string
	if week == "last" {
		sel = string("SELECT SUM(NumNewCases) AS Total FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded <= SUBDATE(CURDATE(),8) AND Uploaded >= SUBDATE(CURDATE(),14)")
	} else if week == "prevToLast" {
		sel = string("SELECT SUM(NumNewCases) AS Total FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded <= SUBDATE(CURDATE(),15) AND Uploaded >= SUBDATE(CURDATE(),21)")
	}

	row := ms.Database.QueryRow(sel, id)

	total := &Total{}

	if err := row.Scan(
		&total.Tot); err != nil {
		return -1, err
	}

	if total.Tot == 0 {
		return 1, nil
	} else {
		return total.Tot, nil
	}
}

type PTR struct {
	Ptr float64
}

type Compare struct {
	Comp float64
}

// PosTestRate Suggestion Aggregation and Comparison
func (ms *MySQLStore) PosTestRateComparison(sc_id int64) (string, float64, error) {
	selPTR := string("SELECT PosTestRateCounty FROM TblStateCounty_Rate WHERE StateCountyID = ? AND Uploaded = SUBDATE(CURDATE(),1)")
	selAverage := string("SELECT AVG(PosTestRateCounty) FROM TblStateCounty_Rate WHERE Uploaded = SUBDATE(CURDATE(),1)")
	rowPTR := ms.Database.QueryRow(selPTR, sc_id)

	ptr := &PTR{}

	if err := rowPTR.Scan(
		&ptr.Ptr); err != nil {
		return "", -1.0, err
	}

	rowCompare := ms.Database.QueryRow(selAverage)

	comp := &Compare{}

	if err := rowCompare.Scan(
		&comp.Comp); err != nil {
		return "", -1.0, err
	}
	if ptr.Ptr > comp.Comp {
		return "higher", (ptr.Ptr / comp.Comp) * 100, nil
	} else if ptr.Ptr < comp.Comp {
		return "lower", (ptr.Ptr / comp.Comp) * 100, nil
	} else if ptr.Ptr == comp.Comp {
		return "equal", (ptr.Ptr / comp.Comp) * 100, nil
	} else {
		return "", -1.0, errors.New("Comparison is invalid.")
	}
	
}