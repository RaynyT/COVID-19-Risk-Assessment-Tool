package handlers

import (
	"fmt"
	"net/http"
	"strings"
	/*
	"encoding/json"
	"strconv"

	"server/gateway/models/activities"
	"server/gateway/models/counties"
	"server/gateway/models/demographics"
	"server/gateway/models/distances"
	"server/gateway/models/inouts"
	"server/gateway/models/othersmasks"
	"server/gateway/models/selfmasks"
	"server/gateway/models/statecounties"
	"server/gateway/models/statecounty_rates"
	"server/gateway/models/states"
	"server/gateway/models/surveys"
	"server/gateway/models/users"
	"server/gateway/models/vaccinetypes"
	"server/gateway/models/volumes"
	*/
)

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
		if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
			http.Error(w, "405, request body must be in JSON", http.StatusNotFound)
			return
		}
		/*
		rec := {}
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(rec); err != nil {
			http.Error(w, "error decoding JSON in repsonse body", http.StatusBadRequest)
			return
		}
		*/
		return


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