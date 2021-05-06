package states

import (
	"strings"
)

type County struct {
	StateID	      int64	  `json:"stateID"`
	StateAbbr	  string  `json:"stateAbbr"`
}