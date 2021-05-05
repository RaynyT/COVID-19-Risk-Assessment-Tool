package statecounty_rates

import (
	"fmt"
	"strings"
)

//StateCounty_Rate represents an stateCounty_Rate in the database
type StateCounty_Rate struct {
	StateCountyRateID         int64     `json:"stateCountyRateID"`
    StateCountyID             int64     `json:"stateCountyID"`
    Uploaded                  string    `json:"uploaded"`
    PosTestRateCounty         float64   `json:"posTestRateCounty"`
    NumNewCasesLastWeek       int64     `json:"numNewCasesLastWeek"`
    NumNewCasesPrevToLastWeek int64     `json:"numNewCasesPrevToLastWeek"`
}

//NewStateCounty_Rate represents a new stateCounty_Rate in the database (mostly for preset funcitonality)
type NewStateCounty_Rate struct {
    StateCountyID             int64     `json:"stateCountyID"`
    PosTestRateCounty         float64   `json:"posTestRateCounty"`
    NumNewCasesLastWeek       int64     `json:"numNewCasesLastWeek"`
    NumNewCasesPrevToLastWeek int64     `json:"numNewCasesPrevToLastWeek"`
}

//Validate validates the new stateCounty_Rate and returns an error if it violates any of these rules
func (nscr *NewStateCounty_Rate) Validate() error {
    if nscr.StateCountyID > 3216  {
        return fmt.Errorf("StateCounty relationship is invalid.")
    }

    if nscr.PosTestRateCounty == nil {
        return fmt.Errorf("PosTestRateCounty cannot be null.")
    }

	if nscr.NumNewCasesLastWeek == nil {
        return fmt.Errorf("NumNewCasesLastWeek cannot be null.")
    }

    if nscr.NumNewCasesPrevToLastWeek == nil {
        return fmt.Errorf("NumNewCasesPrevToLastWeek cannot be null.")
    }
}

//ToStateCounty_Rate converts the NewStateCounty_Rate to StateCounty_Rate
func (nscr *NewStateCounty_Rate) ToStateCounty_Rate() (*StateCounty_Rate, error) {
    validationErr := nscr.Validate()
    if validationErr != nil {
        return nil, validationErr
    }
	t = time.Now().Format("01-02-2006")
    newStateCounty_Rate := &StateCounty_Rate {
		StateCountyID :            nscr.StateCountyID, 
		Uploaded:                  t,
		PosTestRateCounty:         nscr.PosTestRateCounty,
		NumNewCasesLastWeek:       nscr.NumNewCasesLastWeek,
		NumNewCasesPrevToLastWeek: nscr.NumNewCasesPrevToLastWeek,
    }

    return newStateCounty_Rate, nil
}