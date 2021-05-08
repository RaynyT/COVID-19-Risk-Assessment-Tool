package statecounties

//StateCounty represents the distance options in the database
type StateCounty struct {
	StateCountyID 		int64 	`json:"stateCountyID"`
    StateID             string  `json:"stateID"`
    CountyID 	        string	`json:"countyID"`
	Pop                 int64   `json:"pop"`
	FIPS                string  `json:"fips"`
}