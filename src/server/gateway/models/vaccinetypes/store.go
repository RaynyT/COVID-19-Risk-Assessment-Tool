package vaccinetypes

import (
	"errors"
)

//ErrVaccineTypeNotFound is returned when the vaccineType can't be found
var ErrVaccineTypeNotFound = errors.New("VaccineType not found")

//Store represents a store for VaccineTypes
type Store interface {
	//GetByID returns the VaccineType with the given ID
	GetByID(id int64) (*VaccineType, error)

	//GetByID returns the VaccineType with the given ID
	GetByName(name string) (*VaccineType, error)

	//AllVaccineTypes returns all VaccineTypes with the given risk coefficient
	AllVaccineTypes(rc float64) (*[]VaccineType, error)

	//GetByTypeDose uses a vaccine type and dose to send back the vaccine primary key
	GetByTypeDose(t string, dose string) (int64, error)
}