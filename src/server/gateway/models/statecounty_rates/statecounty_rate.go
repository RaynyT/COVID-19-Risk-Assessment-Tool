package statecounty_rates

//StateCounty_Rate represents an stateCounty_Rate in the database
type StateCounty_Rate struct {
	StateCountyRateID         int64     `json:"stateCountyRateID"`
    StateCountyID             int64     `json:"stateCountyID"`
    Uploaded                  string    `json:"uploaded"`
    PosTestRateCounty         float64   `json:"posTestRateCounty"`
    NumNewCases               int64     `json:"numNewCases"`
}