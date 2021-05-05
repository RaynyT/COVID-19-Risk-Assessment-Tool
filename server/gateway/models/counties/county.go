package counties

import (
	"fmt"
)

type County struct {
	CountyID	int64	`json:"countyID"`
	CountyName	string	`json:"countyName"`
}

//NewCounty represents a new county  in the database
type NewCounty struct {
    CountyID	int64	`json:"countyID"`
	CountyName	string	`json:"countyName"`
}

// //Validate validates the new activity type and returns an error if it violates any of these rules
// func (na *NewCounty) Validate() error {
//     if na.County > 4 {
//         return fmt.Errorf("Activity type is invalid.")
//     }

 
// }

//ToCounty converts the NewCounty to County
func (na *NewCounty) ToCounty() (*County, error) {
    // validationErr := na.Validate()
    // if validationErr != nil {
    //     return nil, validationErr
    // }

    NewCounty := &County {
		CountyID:	na.countyID,
		CountyName:	na.countyName,
    }

    return newCounty, nil
}