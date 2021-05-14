package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"encoding/json"
	"io/ioutil"
	//"strconv"

	//"server/gateway/models/activities"
	//"server/gateway/models/counties"
	//"server/gateway/models/demographics"
	//"server/gateway/models/distances"
	//"server/gateway/models/inouts"
	//"server/gateway/models/othersmasks"
	//"server/gateway/models/selfmasks"
	//"server/gateway/models/statecounties"
	//"server/gateway/models/statecounty_rates"
	//"server/gateway/models/states"
	//"server/gateway/models/surveys"
	//"server/gateway/models/users"
	//"server/gateway/models/vaccinetypes"
	//"server/gateway/models/volumes"
)

// FILL IN ERROR TYPES LATER

// GET ROUTES - DONE

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/about" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! About handler works!")
		return
	}
}

func FAQHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/faq" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! FAQ handler works!")
		return
	}
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/contact-us" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Contact-Us handler works!")
		return
	}
}

func TutorialHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/get-started" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Get-Started handler works!")
		return
	}
}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/dashboard" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Dashboard handler works!")
		return
	}
}

func CalculatorHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/calculator" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Calculator handler works!")
		return
	}
}

func ResultsHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/results" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Results handler works!")
		return
	}
}

func UpdateHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/update" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Update handler works!")
		return
	}
}

// POST ROUTES -- IP

type req_loc struct {
	StateCode string
	County    string
}

type req_vac struct {
	T                   string
	DoseNumber          int64
	EffectiveDoseNumber int64
	TwoWeeks            string
}

type req_act struct {
	Setting   string
	Attendees string
	Hours     string
	Minutes   string
}

type req_om struct {
	T          string
	NumWearers string
}


type req_data struct {
	UserID            float64
	UserLocation      req_loc
	Vaccination       req_vac
	ActivityBasicInfo req_act
	Distancing        string
	SpeakingVolume    string
	OwnMask           string
	OthersMask        req_om
	RiskScore         float64
	SurveyCompleted   bool
}

// Receives: State and County
// Returns: Product Of (NumOfNewCasesRatio, PositiveTestRate, Population)
// Functions:
// 	SELECT statement returning product of three variables for StateCounty_Rates
//  SELECT statement for obtaining StateID and CountyID for given StateAbbr and CountyName
func (ctx *HandlerContext) RetrieveCountyRatesHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/retrieve_county_rates" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		// Make sure received data is in JSON form
		if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
			http.Error(w, "405, request body must be in JSON", http.StatusNotFound)
			return
		}
		var data req_data
		body, _ := ioutil.ReadAll(r.Body)
		err := json.Unmarshal([]byte(body), &data)
		if err != nil {
			http.Error(w, "JSON error: " + err.Error(), http.StatusBadRequest)
			return
		}
		// Debugging
		fmt.Fprintf(w, "request data: %v", data)
		// Get StateID
		state, err := ctx.StatesStore.GetByAbbr(data.UserLocation.StateCode)
		if err != nil {
			http.Error(w, "405, error getting state info." + err.Error(), http.StatusBadRequest)
			return
		}
		// Get CountyID
		county, err := ctx.CountiesStore.GetByName(data.UserLocation.County)
		if err != nil {
			http.Error(w, "405, error getting county info.", http.StatusNotFound)
			return
		}
		// With StateID and CountyID get StateCountyID
		stateCounty, err := ctx.StateCountiesStore.StateCounty(state.StateID, county.CountyID)
		if err != nil {
			http.Error(w, "405, error getting stateCounty info." + err.Error(), http.StatusNotFound)
			return
		}
		// Extract the StateCounty population
		population := stateCounty.Pop
		fmt.Fprintf(w, "extracted data: %v", population)
		// Get the positive test rate and aggregated number of new cases
		posTestRateRet, delayFactor, err := ctx.StateCounty_RatesStore.AggregatedStateCounty_Rates(stateCounty.StateCountyID)
		if err != nil {
			http.Error(w, "405, error getting aggregated stateCounty_Rate value. Err: " + err.Error(), http.StatusNotFound)
			return
		}

		if posTestRateRet <= 0 {
			posTestRateRet = 1
		}
		// Last aggregation to return to web client
		// DelayFactor / Population in millions
		delayPopQuotientRet := delayFactor / float64(population / 1000000)

		// Respond to the client with:
		// A response Content-Type header set to application/json to indicate that the
		// response body is encoded as JSON.
		w.Header().Set("Content-Type", "application/json")
		// A status code of http.StatusCreated (201) to indicate that a new resource was created.
		w.WriteHeader(201)
		// The new user profile in the response body, encoded as a JSON object.
		ret, _ := json.Marshal(struct {
			posTestRate      float64 
			delayPopQuotient float64
		}{
			posTestRate:      float64(posTestRateRet),
			delayPopQuotient: float64(delayPopQuotientRet),
		})
		w.Write([]byte(ret))
		
		//fmt.Fprintf(w, "Congrats! Retrieve County Rates handler works!")
		//return
	}
}

// Receives: Local storage
// Returns: Nothing
// Functions:
//	SELECT statements from all tables to get ids for values
//  IF statement checking if new user
//		IF new user --> INSERT into TblUser and INSERT into TblDemographics
//	INSERT into TblActivity
//  INSERT into TblSurvey
func (ctx *HandlerContext) InsertSurveyHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/insert_survey" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Insert Survey handler works!")
		return
	}
}

// Receives: Local storage
// Returns: Nothing
// Functions:
// 	SELECT statements from all tables to get ids for values
//	SELECT statement that gets last survey id for that user id/hash
//	INSERT into TblActivity
//  INSERT into TblSurvey
func (ctx *HandlerContext) InsertUpdatedSurveyHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/insert_updated_survey" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "Congrats! Insert Updated Survey handler works!")
		return
	}
}

// Receives: Local storage
// Returns: Recommendations based on survey
func (ctx *HandlerContext) RecommendationsHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/recommendations" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "Congrats! Recommendations handler works!")
		return
	}
}