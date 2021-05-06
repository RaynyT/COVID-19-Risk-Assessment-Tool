package statecounties

import (
	"errors"
	"strings"
)

//ErrStateCountyNotFound is returned when the stateCounty can't be found
var ErrStateCountyNotFound = errors.New("StateCounty not found")

//Store represents a store for StateCounties
type Store interface {
	//GetByID returns the StateCounty with the given ID
	GetByID(id int64) (*StateCounty, error)

	//GetByID returns the StateCounty with the given FIPS
	GetByFIPS(fips string) (*StateCounty, error)

	//StateCounty returns a given state county combination that matches the given state id and county id
	StateCounty(s_id int64, c_id int64) (*StateCounty, error)

	//AllStateCounties returns all StateCounties with the given state id
	AllStateCounties(s_id int64) (*[]StateCounty, error)
}