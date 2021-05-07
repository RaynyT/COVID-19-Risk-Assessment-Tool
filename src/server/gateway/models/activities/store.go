package activities

import (
	"errors"
)

//ErrActivityNotFound is returned when the student can't be found
var ErrActivityNotFound = errors.New("Activity not found")

//Store represents a store for Activities
type Store interface {
	//GetByID returns the Activity with the given ID
	GetByID(id int64) (*Activity, error)

	//GetByID returns the Activity with the given ID
	GetByName(name string) (*Activity, error)

	//Insert inserts the activity into the database, and returns
	//the newly-inserted Activity, complete with the DBMS-assigned ID
	Insert(activity *Activity) (*Activity, error)

	//Delete deletes the activity with the given ID
	Delete(id int64) error

	//AllActivities returns all the activities given an activity type
	AllActivities(id int64) (*[]Activity, error)
}