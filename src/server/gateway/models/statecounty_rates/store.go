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

	//AggregatedStateCounty_Rates returns all the stateCounty_Rates given an stateCounty_Rate type
	AggregatedStateCounty_Rates(id int64) (float64, float64, error)

	//HelperAggregator aggregates number of new cases for given week
	HelperAggregator(id int64, week string) (int64, error)
}