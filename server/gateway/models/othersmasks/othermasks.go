package othersmasks

import (
	"strings"
)

//OtherMasks represents the otherMasks options in the database
type OtherMasks struct {
	OtherMasksID 		int64 	`json:"otherMasksID"`
    RiskCoefficient     float64 `json:"riskCoefficient"`
    OtherMasksName 	    string	`json:"otherMasksName"`
}