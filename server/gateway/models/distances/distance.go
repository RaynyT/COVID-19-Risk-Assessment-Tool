package distances

import (
	"fmt"
	"strings"
)

//Distance represents the distance options in the database
type Distance struct {
	DistanceID 		int64 	`json:"distanceID"`
    RiskCoefficient float64 `json:"riskCoefficient"`,
    DistanceName 	string	`json:"distanceName"`
}

//NewDistance represents a new distance in the database
type NewDistance struct {
    RiskCoefficient float64 `json:"riskCoefficient"`,
    DistanceName 	string	`json:"distanceName"`
}


//ToDistance converts the NewDistance to Distance
func (nd *NewDistance) ToDistance() (*Distance, error) {
    // validationErr := nd.Validate()
    // if validationErr != nil {
    //     return nil, validationErr
    // }
    // t = time.Now().Format("01-02-2006")
    newDistance := &Distance {
		RiskCoefficient:    nd.RiskCoefficient,
		DistanceName:    nd.VaccDistanceNameineTypeID,
    }

    return newDistance, nil
}
