package distances

import (
	"errors"
)

//ErrDistanceNotFound is returned when the distance can't be found
var ErrDistanceNotFound = errors.New("Distance not found")

//Store represents a store for Distances
type Store interface {
	//GetByID returns the Distance with the given ID
	GetByID(id int64) (*Distance, error)

	//GetByID returns the Distance with the given Name
	GetByName(name string) (*Distance, error)

	//AllDistances returns all Distances with the given risk coefficient
	AllDistances(rc float64) (*[]Distance, error)
}