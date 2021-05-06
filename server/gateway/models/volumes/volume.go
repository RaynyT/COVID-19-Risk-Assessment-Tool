package volumes

import (
	"strings"
)

//Volume represents the volume options in the database
type Volume struct {
	VolumeID 		int64 	`json:"volumeID"`
    RiskCoefficient float64 `json:"riskCoefficient"`
    VolumeName 	    string	`json:"volumeName"`
}