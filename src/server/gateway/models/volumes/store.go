package volumes

import (
	"errors"
	"strings"
)

//ErrVolumeNotFound is returned when the volume can't be found
var ErrVolumeNotFound = errors.New("Volume not found")

//Store represents a store for Volumes
type Store interface {
	//GetByID returns the Volume with the given ID
	GetByID(id int64) (*Volume, error)

	//GetByID returns the Volume with the given Name
	GetByName(name string) (*Volume, error)

	//AllVolumes returns all Volumes with the given risk coefficient
	AllVolumes(rc float64) (*[]Volume, error)
}