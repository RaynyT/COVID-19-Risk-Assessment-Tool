package states

import (
	"errors"
	"strings"
)

//ErrActivityNotFound is returned when the state can't be found
var ErrStateNotFound = errors.New("State not found")

//Store represents a store for States
type Store interface {
	//GetByID returns the State with the given ID
	GetByID(id int64) (*State, error)

	//GetByAbbr returns the State with the given Abbr
	GetByAbbr(abbr string) (*State, error)
}