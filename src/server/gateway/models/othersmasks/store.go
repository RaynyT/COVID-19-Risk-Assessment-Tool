package othersmasks

import (
	"errors"
)

//ErrOtherMasksNotFound is returned when the otherMasks can't be found
var ErrOtherMasksNotFound = errors.New("OtherMasks not found")

//Store represents a store for OthersMasks
type Store interface {
	//GetByID returns the OtherMasks with the given ID
	GetByID(id int64) (*OtherMasks, error)

	//GetByID returns the OtherMasks with the given ID
	GetByName(name string) (*OtherMasks, error)

	//AllOthersMasks returns all OtherMasks with the given risk coefficient
	AllOthersMasks(rc float64) (*[]OtherMasks, error)
}