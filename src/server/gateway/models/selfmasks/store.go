package selfmasks

import (
	"errors"
)

//ErrSelfMaskNotFound is returned when the selfMask can't be found
var ErrSelfMaskNotFound = errors.New("SelfMask not found")

//Store represents a store for SelfMasks
type Store interface {
	//GetByID returns the SelfMask with the given ID
	GetByID(id int64) (*SelfMask, error)

	//GetByID returns the SelfMask with the given ID
	GetByName(name string) (*SelfMask, error)

	//AllSelfMasks returns all SelfMasks with the given risk coefficient
	AllSelfMasks(rc float64) (*[]SelfMask, error)
}