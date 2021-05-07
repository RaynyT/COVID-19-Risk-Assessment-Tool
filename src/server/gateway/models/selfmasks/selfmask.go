package selfmasks

import (
	"strings"
)

//SelfMask represents the selfMask options in the database
type SelfMask struct {
	SelfMaskID 		int64 	`json:"selfMaskID"`
    RiskCoefficient float64 `json:"riskCoefficient"`
    SelfMaskName 	string	`json:"selfMaskName"`
}