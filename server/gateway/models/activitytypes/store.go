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

}