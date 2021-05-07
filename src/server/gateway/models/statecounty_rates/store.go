package statecounty_rates

import (
	"errors"
)

//ErrStateCounty_RateNotFound is returned when the student can't be found
var ErrStateCounty_RateNotFound = errors.New("StateCounty_Rate not found")

//Store represents a store for StateCounty_Rates
type Store interface {
	//GetByID returns the StateCounty_Rate with the given ID
	GetByID(id int64) (*StateCounty_Rate, error)

	//Insert inserts the stateCounty_Rate into the database, and returns
	//the newly-inserted StateCounty_Rate, complete with the DBMS-assigned ID
	Insert(stateCounty_Rate *StateCounty_Rate) (*StateCounty_Rate, error)

	//Delete deletes the stateCounty_Rate with the given ID
	Delete(id int64) error

	//AllStateCounty_Rates returns all the stateCounty_Rates given an stateCounty_Rate type
	AllStateCounty_Rates(id int64) (*StateCounty_Rate, error)
}