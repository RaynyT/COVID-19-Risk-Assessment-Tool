package demographics

import (
	"fmt"
    "time"
)

//Demographic represents a demographic in the database
type Demographic struct {
	DemographicID    int64   `json:"demographicID"`
    UserID           int64   `json:"userID"`
    StateCountyID    int64   `json:"stateCountyID"`
    VaccineTypeID    int64   `json:"vaccineTypeID"`
    UserUpdateDate   string  `json:"userUpdate"`
}

//NewDemographic represents a new demographic in the database
type NewDemographic struct {
    UserID           int64   `json:"userID"`
    StateCountyID    int64   `json:"stateCountyID"`
    VaccineTypeID    int64   `json:"vaccineTypeID"`
}

//UpdateDemographic updates a users location and vaccine information
type UpdateDemographics struct {
	StateCountyID    int64   `json:"stateCountyID"`
    VaccineTypeID    int64   `json:"vaccineTypeID"`
}

//Validate validates the new demographic and returns an error if it violates any of these rules
func (nd *NewDemographic) Validate() error {
    if nd.StateCountyID > 3216  {
        return fmt.Errorf("StateCounty relationship is invalid.")
    }

    if nd.VaccineTypeID > 10 {
        return fmt.Errorf("Vaccine type is invalid.")
    }

    return nil
}

//ToDemographic converts the NewDemographic to Demographic
func (nd *NewDemographic) ToDemographic() (*Demographic, error) {
    validationErr := nd.Validate()
    if validationErr != nil {
        return nil, validationErr
    }
    t := time.Now().Format("01-02-2006")
    newDemographic := &Demographic {
		UserID:           nd.UserID,
		StateCountyID:    nd.StateCountyID,
		VaccineTypeID:    nd.VaccineTypeID,
		UserUpdateDate:   t,
    }

    return newDemographic, nil
}

//ApplyUpdates updates the vaccine and location information associated with a user
func (d *Demographic) ApplyUpdates(up *UpdateDemographics) error {
	t := time.Now().Format("01-02-2006")
    
    if up.StateCountyID > 0 {
		if up.StateCountyID <= 3216 {
			d.StateCountyID = up.StateCountyID
		}
	}

	if up.VaccineTypeID > 0 {
		if up.VaccineTypeID <= 10 {
			d.VaccineTypeID = up.VaccineTypeID
		}
	}

    d.UserUpdateDate = t

	return nil
}