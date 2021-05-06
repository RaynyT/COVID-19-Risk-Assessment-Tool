package counties

import (
	"strings"
)

type County struct {
	CountyID	  int64	  `json:"countyID"`
	CountyName	string	`json:"countyName"`
}