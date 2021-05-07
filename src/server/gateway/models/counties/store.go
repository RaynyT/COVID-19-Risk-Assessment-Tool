package counties

import (
	"errors"
	"strings"
)

//ErrActivityNotFound is returned when the county can't be found
var ErrCountyNotFound = errors.New("County not found")

//Store represents a store for Counties
type Store interface {
	//GetByID returns the County with the given ID
	GetByID(id int64) (*County, error)

	//GetByID returns the County with the given Name
	GetByName(name string) (*County, error)
}