package statecounty_rates

import (
	"fmt"
    "time"
)

//StateCounty_Rate represents an stateCounty_Rate in the database
type StateCounty_Rate struct {
	StateCountyRateID         int64     `json:"stateCountyRateID"`
    StateCountyID             int64     `json:"stateCountyID"`
    Uploaded                  string    `json:"uploaded"`
    PosTestRateCounty         float64   `json:"posTestRateCounty"`
    NumNewCases               int64     `json:"numNewCases"`
}

//NewStateCounty_Rate represents a new stateCounty_Rate in the database (mostly for preset funcitonality)
type NewStateCounty_Rate struct {
    StateCountyID             int64     `json:"stateCountyID"`
    PosTestRateCounty         float64   `json:"posTestRateCounty"`
    NumNewCases               int64     `json:"numNewCasesLastWeek"`
}

//Validate validates the new stateCounty_Rate and returns an error if it violates any of these rules
func (nscr *NewStateCounty_Rate) Validate() error {
    if nscr.StateCountyID > 3216  {
        return fmt.Errorf("StateCounty relationship is invalid.")
    }

	if nscr.NumNewCases < 0 {
        return fmt.Errorf("NumNewCasesLastWeek cannot be null.")
    }

    return nil
}

//ToStateCounty_Rate converts the NewStateCounty_Rate to StateCounty_Rate
func (nscr *NewStateCounty_Rate) ToStateCounty_Rate() (*StateCounty_Rate, error) {
    validationErr := nscr.Validate()
    if validationErr != nil {
        return nil, validationErr
    }
	t := time.Now().Format("01-02-2006")
    newStateCounty_Rate := &StateCounty_Rate {
		StateCountyID :            nscr.StateCountyID, 
		Uploaded:                  t,
		PosTestRateCounty:         nscr.PosTestRateCounty,
		NumNewCases:               nscr.NumNewCases,
    }

    return newStateCounty_Rate, nil
}