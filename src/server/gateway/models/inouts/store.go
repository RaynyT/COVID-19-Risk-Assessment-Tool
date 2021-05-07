package inouts

import (
	"errors"
	"strings"
)

//ErrInOutNotFound is returned when the inOut can't be found
var ErrInOutNotFound = errors.New("InOut not found")

//Store represents a store for InOuts
type Store interface {
	//GetByID returns the InOut with the given ID
	GetByID(id int64) (*InOut, error)

	//GetByID returns the InOut with the given ID
	GetByName(name string) (*InOut, error)

	//AllInOuts returns all InOuts with the given risk coefficient
	AllInOuts(rc float64) (*[]InOut, error)
}