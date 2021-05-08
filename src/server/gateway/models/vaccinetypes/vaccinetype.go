package vaccinetypes

//VaccineType represents the vaccineType options in the database
type VaccineType struct {
	VaccineTypeID 		int64 	`json:"vaccineTypeID"`
    RiskCoefficient     float64 `json:"riskCoefficient"`
    VaccineTypeName 	string	`json:"vaccineTypeName"`
}