package counties

import (
	"errors"
)

//ErrActivityNotFound is returned when the county can't be found
var ErrActivityNotFound = errors.New("County not found")

//Store represents a store for Counties
type Store interface {
	//GetByID returns the County with the given ID
	GetByID(id int64) (*County, error)

	//GetByID returns the County with the given ID
	GetByName(name string) (*County, error)

	//Insert inserts the county into the database, and returns
	//the newly-inserted County, complete with the DBMS-assigned ID
	Insert(county *County) (*County, error)

	//Delete deletes the county with the given ID
	Delete(id int64) error
}