package distances

//Distance represents the distance options in the database
type Distance struct {
	DistanceID 		int64 	`json:"distanceID"`
    RiskCoefficient float64 `json:"riskCoefficient"`
    DistanceName 	string	`json:"distanceName"`
}