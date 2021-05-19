package demographics

import (
	"errors"
)

//ErrDemographicNotFound is returned when the student can't be found
var ErrDemographicNotFound = errors.New("Demographic not found")

//Store represents a store for Demographics
type Store interface {
	//GetByID returns the Demographic with the given ID
	GetByID(id int64) (*Demographic, error)

	//GetByID returns the Demographic with the given UserID
	GetByUser(userid int64) (*Demographic, error)

	//Insert inserts the demographic into the database, and returns
	//the newly-inserted Demographic, complete with the DBMS-assigned ID
	Insert(demographic *Demographic) (int64, error)

	//Update updates user's demographic
	Update(column string, id int64, userid int64) (error)

	//Delete deletes the demographic with the given ID
	Delete(id int64) error

	//AllDemographics returns all the demographics given an demographic type
	AllDemographics(id int64, column string) (*[]Demographic, error)
}