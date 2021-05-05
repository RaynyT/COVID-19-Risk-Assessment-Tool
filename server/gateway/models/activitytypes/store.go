package activitytypes

import (
	"errors"
)

//ErrActivityTypeNotFound is returned when the activity type can't be found
var ErrActivityTypeNotFound = errors.New("ActivityType not found")

//Store represents a store for Activities
type Store interface {
	//GetByID returns the ActivityType with the given ID
	GetByID(id int64) (*ActivityType, error)

	//GetByID returns the ActivityType with the given Name
	GetByName(name string) (*ActivityType, error)

	//Insert inserts the activityType into the database, and returns
	//the newly-inserted ActivityType, complete with the DBMS-assigned ID
	Insert(activityType *ActivityType) (*ActivityType, error)

	//Delete deletes the activity with the given ID
	Delete(id int64) error

}