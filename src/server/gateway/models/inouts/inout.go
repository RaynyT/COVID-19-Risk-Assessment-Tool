package inouts

//InOut represents the inOut options in the database
type InOut struct {
	InOutID 		int64 	`json:"inOutID"`
    RiskCoefficient float64 `json:"riskCoefficient"`
    InOutName 	    string	`json:"inOutName"`
}