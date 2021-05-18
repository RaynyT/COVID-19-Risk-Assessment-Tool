package vaccinetypes

import (
	"database/sql"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "VaccineTypeID"
	Name GetByType = "VaccineTypeName"
)

// MySQLStore is a user.Store backed by MySQL
type MySQLStore struct {
	Database *sql.DB
}

// NewMySQLStore constructs a new MySQLStore, and returns an error
// if there is a problem along the way.
func NewMySQLStore(dataSourceName string) (*MySQLStore, error) {
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		return nil, err
	}

	return &MySQLStore{db}, nil
}

// getByProvidedType gets a specific vaccineType given the provided type.
// This requires the GetByType to be "unique" in the database - hence VaccineTypeID and VaccineTypeName
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*VaccineType, error) {
	sel := string("SELECT VaccineTypeID, RiskCoefficient, VaccineTypeName FROM TblVaccineType WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	vaccineType := &VaccineType{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&vaccineType.VaccineTypeID,
		&vaccineType.RiskCoefficient,
		&vaccineType.VaccineTypeName); err != nil {
		return nil, err
	}
	return vaccineType, nil
}

//GetByID returns the VaccineType with the given ID
func (ms *MySQLStore) GetByID(id int64) (*VaccineType, error) {
	return ms.getByProvidedType(ID, id)
}

//GetByName returns the VaccineType with the Name
func (ms *MySQLStore) GetByName(name string) (*VaccineType, error) {
	return ms.getByProvidedType(Name, name)
}

// Gets all vaccineTypes based on a given:
// Risk Coefficient
func (ms *MySQLStore) AllVaccineTypes(rc float64) (*[]VaccineType, error) {
	sel := string("SELECT VaccineTypeID, RiskCoefficient, VaccineTypeName FROM TblVaccineType WHERE RiskCoefficient = ?")

	rows, err := ms.Database.Query(sel, rc)
	var vaccineTypes []VaccineType

	for rows.Next() {
		var vaccineType VaccineType
		err = rows.Scan(&vaccineType.VaccineTypeID, &vaccineType.RiskCoefficient, &vaccineType.VaccineTypeName)
		
		if err != nil {
			return nil, err
		}
		vaccineTypes = append(vaccineTypes, vaccineType)
	}

	return &vaccineTypes, nil
}

// getByProvidedType gets a specific vaccineType given the provided type.
// This requires the GetByType to be "unique" in the database - hence VaccineTypeID and VaccineTypeName
func (ms *MySQLStore) GetByTypeDose(t string, dose int64) (int64, error) {
	var sel string
	if dose > 0 {
		sel = string("SELECT VaccineTypeID, RiskCoefficient, VaccineTypeName FROM TblVaccineType WHERE VaccineTypeName LIKE '%" + t + "%' AND VaccineTypeName LIKE '%" + string(dose) + "%'")
	} else {
		return 10, nil
	}
	rows, err := ms.Database.Query(sel, t, dose)
	if err != nil {
		return -1, err
	}
	defer rows.Close()

	vaccineType := &VaccineType{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&vaccineType.VaccineTypeID,
		&vaccineType.RiskCoefficient,
		&vaccineType.VaccineTypeName); err != nil {
		return -1, err
	}
	return vaccineType.VaccineTypeID, nil
}