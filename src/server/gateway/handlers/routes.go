package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"encoding/json"
	"io/ioutil"
	//"math"
	"crypto/sha256"
	"strconv"
	"server/gateway/models/activities"
	"server/gateway/models/demographics"
	"server/gateway/models/surveys"
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
	Type                string
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
	Type          string
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
		var data req_loc
		body, _ := ioutil.ReadAll(r.Body)
		err := json.Unmarshal([]byte(body), &data)
		if err != nil {
			http.Error(w, "JSON error: " + err.Error(), http.StatusBadRequest)
			return
		}
		// Get StateID
		state, err := ctx.StatesStore.GetByAbbr(data.StateCode)
		if err != nil {
			http.Error(w, "405, error getting state info." + err.Error(), http.StatusBadRequest)
			return
		}
		// Get CountyID
		county, err := ctx.CountiesStore.GetByName(data.County)
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
		// Get the positive test rate and aggregated number of new cases
		posTestRateRet, delayFactor, reportedCasesRet, err := ctx.StateCounty_RatesStore.AggregatedStateCounty_Rates(stateCounty.StateCountyID)
		if err != nil {
			http.Error(w, "405, error getting aggregated stateCounty_Rate value. Err: " + err.Error(), http.StatusNotFound)
			return
		}

		// Last aggregation to return to web client
		// DelayFactor / Population in millions
		delayPopQuotientRet := delayFactor / (float64(population) / float64(1000000))

		// Respond to the client with:
		// A response Content-Type header set to application/json to indicate that the
		// response body is encoded as JSON.
		w.Header().Set("Content-Type", "application/json")
		// A status code of http.StatusCreated (201) to indicate that a new resource was created.
		w.WriteHeader(201)
		// The new user profile in the response body, encoded as a JSON object.
		ret, _ := json.Marshal(&struct {
			PosTestRate      float64 `json:"posTestRate"`
			DelayPopQuotient float64 `json:"delayPopQuotient"`
			ReportedCases    int64   `json:"reportedCases"`
		}{
			PosTestRate:      posTestRateRet,
			DelayPopQuotient: delayPopQuotientRet,
			ReportedCases:    reportedCasesRet,
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
// If Update - SELECT statement that gets last survey id for that demid
func (ctx *HandlerContext) InsertSurveyHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/insert_survey" && r.URL.Path != "/insert_updated_survey" {
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
		if data.SurveyCompleted != true {
			http.Error(w, "405, user has not completed survey.", http.StatusNotFound)
				return
		}
		
		// if check for if user is new or not
		var userid int64
		var demid int64
		useridconvert := fmt.Sprintf("%f", data.UserID)
		userHash := sha256.Sum256([]byte(useridconvert))
		// get location info
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
		// Get StateCountyID
		stateCounty, err := ctx.StateCountiesStore.StateCounty(state.StateID, county.CountyID)
		if err != nil {
			http.Error(w, "405, error getting stateCounty info." + err.Error(), http.StatusNotFound)
			return
		}
		// Get VaccineTypeID
		vaccine, err := ctx.VaccineTypesStore.GetByTypeDose(data.Vaccination.Type, int64(data.Vaccination.EffectiveDoseNumber))
		// Debugging
		fmt.Fprintf(w, "request data: %v", vaccine)
		if err != nil {
			http.Error(w, "405, error getting vaccination info.", http.StatusNotFound)
			return
		}
		user, err := ctx.UsersStore.GetByCookieHash(fmt.Sprintf("%f", userHash))
		if err != nil {
			// if user is new insert into db
			userid, err = ctx.UsersStore.Insert(fmt.Sprintf("%f", userHash))
			if err != nil {
				http.Error(w, "405, error inserting new user." + err.Error(), http.StatusBadRequest)
				return
			}
			// Insert into TblDemographic
			newUserDemographic := &demographics.NewDemographic{
				UserID:        userid,
				StateCountyID: stateCounty.StateCountyID,
				VaccineTypeID: vaccine,
			}
			dem, err := newUserDemographic.ToDemographic()
			if err != nil {
				http.Error(w, "405, error creating demographic." + err.Error(), http.StatusBadRequest)
				return
			}
			demid, err = ctx.DemographicsStore.Insert(dem)
			if err != nil {
				http.Error(w, "405, error inserting new demographic." + err.Error(), http.StatusBadRequest)
				return
			}
		} else {
			// Get UserID
			userid = user.UserID
			// Get DemographicID
			dem, err :=  ctx.DemographicsStore.GetByUser(userid)
			if err != nil {
				http.Error(w, "405, error getting demographic with user id." + err.Error(), http.StatusBadRequest)
				return
			}
			demid = dem.DemographicID
			// Check if the user updated their location or vaccine information
			// If yes, Update Demographic Table
			if stateCounty.StateCountyID != dem.StateCountyID && vaccine != dem.VaccineTypeID {
				err := ctx.DemographicsStore.Update("", stateCounty.StateCountyID, vaccine, userid)
				if err != nil {
					http.Error(w, "405, error updating location and vaccine" + err.Error(), http.StatusBadRequest)
					return
				}
			} else if stateCounty.StateCountyID != dem.StateCountyID {
				err := ctx.DemographicsStore.Update("StateCountyID", stateCounty.StateCountyID, -1, userid)
				if err != nil {
					http.Error(w, "405, error updating location" + err.Error(), http.StatusBadRequest)
					return
				}
			} else if vaccine != dem.VaccineTypeID {
				err := ctx.DemographicsStore.Update("VaccineTypeID", -1, vaccine, userid)
				if err != nil {
					http.Error(w, "405, error updating vaccine" + err.Error(), http.StatusBadRequest)
					return
				}
			}
		}
		fmt.Fprintf(w, "dem: %v", demid)
		// Insert Activity
		// Get VolumeID
		var volid int64
		if data.SpeakingVolume == "notSpeaking" {
			vol, _ := ctx.VolumesStore.GetByName("Speaking Minimally")
			volid = vol.VolumeID
		} else if data.SpeakingVolume == "normalSpeaking" {
			vol, _ := ctx.VolumesStore.GetByName("Speaking Normally")
			volid = vol.VolumeID
		} else if data.SpeakingVolume == "loudSpeaking" {
			vol, _ := ctx.VolumesStore.GetByName("Speaking Loudly / Shouting")
			volid = vol.VolumeID
		} else {
			http.Error(w, "405, error getting volume info." + err.Error(), http.StatusBadRequest)
			return
		}
		// Debugging
		fmt.Fprintf(w, "request vol: %v", volid)
		// Get InOutID
		inout, _ := ctx.InOutsStore.GetByName(data.ActivityBasicInfo.Setting)
		inoutid := inout.InOutID
		// Debugging
		fmt.Fprintf(w, "request inout: %v", inoutid)
		// Get DistanceID
		var distid int64
		if data.Distancing == "lessThanSixFeet" {
			dist, _ := ctx.DistancesStore.GetByName("<6 Feet")
			distid = dist.DistanceID
		} else if data.Distancing == "sixFeet" {
			dist, _ := ctx.DistancesStore.GetByName("6+ Feet")
			distid = dist.DistanceID
		} else if data.Distancing == "nineFeet" {
			dist, _ := ctx.DistancesStore.GetByName("9+ Feet")
			distid = dist.DistanceID
		} else if data.Distancing == "twelveFeetOrMore" {
			dist, _ := ctx.DistancesStore.GetByName("12+ Feet")
			distid = dist.DistanceID
		} else {
			http.Error(w, "405, error getting distance info." + err.Error(), http.StatusBadRequest)
			return
		}
		// Debugging
		fmt.Fprintf(w, "request dist: %v", distid)
		// Get SelfMaskID
		var selfid int64
		if data.OwnMask == "noMask" {
			self, _ := ctx.SelfMasksStore.GetByName("No Mask")
			selfid = self.SelfMaskID
		} else if data.OwnMask == "cottonMask" {
			self, _ := ctx.SelfMasksStore.GetByName("Cotton Mask")
			selfid = self.SelfMaskID
		} else if data.OwnMask == "surgicalMask" {
			self, _ := ctx.SelfMasksStore.GetByName("Surgical Mask")
			selfid = self.SelfMaskID
		} else if data.OwnMask == "kn95Mask" {
			self, _ := ctx.SelfMasksStore.GetByName("KN95 Mask")
			selfid = self.SelfMaskID
		} else {
			http.Error(w, "405, error getting self mask info." + err.Error(), http.StatusBadRequest)
			return
		}
		// Debugging
		fmt.Fprintf(w, "request self: %v", selfid)
		// Get OthersMaskID
		
		var othersid int64
		if data.OthersMask.Type == "noMask" {
			others, _ := ctx.OthersMasksStore.GetByName("No Mask")
			othersid = others.OtherMasksID
		} else if data.OthersMask.Type == "cottonMask" {
			others, _ := ctx.OthersMasksStore.GetByName("Cotton Mask")
			othersid = others.OtherMasksID
		} else if data.OthersMask.Type == "surgicalMask" {
			others, _ := ctx.OthersMasksStore.GetByName("Surgical Mask")
			othersid = others.OtherMasksID
		} else if data.OthersMask.Type == "kn95Mask" {
			others, _ := ctx.OthersMasksStore.GetByName("KN95 Mask")
			othersid = others.OtherMasksID
		} else {
			http.Error(w, "405, error getting others mask info." + err.Error(), http.StatusBadRequest)
			return
		}
		// Debugging
		fmt.Fprintf(w, "request others: %v", othersid)
		// NumWearers
		var numwearers int64
		if data.OthersMask.NumWearers == "" {
			numwearers = 0
		} else {
			nw, err := strconv.Atoi(data.OthersMask.NumWearers)
			if err != nil {
				http.Error(w, "405, error converting numweaerers to int." + err.Error(), http.StatusBadRequest)
				return
			}
			numwearers = int64(nw)
		}
		// Debugging
		fmt.Fprintf(w, "request nw: %v", int64(numwearers))
		
		// Insertion
		np, err := strconv.Atoi(data.ActivityBasicInfo.Attendees)
		if err != nil {
			http.Error(w, "405, error converting attendees to int.", http.StatusBadRequest)
			return
		}
		h, err := strconv.Atoi(data.ActivityBasicInfo.Hours)
		if err != nil {
			http.Error(w, "405, error converting hours to int.", http.StatusBadRequest)
			return
		}
		m, err := strconv.Atoi(data.ActivityBasicInfo.Minutes)
		if err != nil {
			http.Error(w, "405, error converting minutes to int.", http.StatusBadRequest)
			return
		}
		newActivity := &activities.NewActivity{
			VolumeID:        volid,
			InOutID:         inoutid,
			DistanceID:      distid,
			SelfMaskID:      selfid,
			OtherMasksID:    othersid,
			ActivityName:    "",
			NumPeople:       int64(np),
			NumPeopleMasks:  int64(numwearers),
			DurationHours:   int64(h),
			DurationMinutes: int64(m),
		}
		// Check if activity combination already exists
		act, _ := newActivity.ToActivity()
		actid, _ := ctx.ActivitiesStore.Exists(act)
		if actid == -1 {
			actid, err = ctx.ActivitiesStore.Insert(act)
			if err != nil {
				http.Error(w, "405, error inserting new activity." + err.Error(), http.StatusBadRequest)
				return
			}
		}
		// Can combine the update and regular survey handlers
		// Check which call this is - updated or not
		surID := int64(-1)
		if r.URL.Path == "/insert_updated_survey" {
			// Get last survey id for user utilizing demid
			surID, err = ctx.SurveysStore.GetLastSurvey(demid)
			if err != nil {
				http.Error(w, "405, error getting last survey id for user." + err.Error(), http.StatusBadRequest)
				return
			}
		}
		// Insert Survey
		newSurvey := &surveys.NewSurvey{
			DemographicID: demid,
			ActivityID:    actid,
			GivenName:     "",
			OverallScore:  data.RiskScore,
			LastSurveyID:  surID,
		}
		sur, err := newSurvey.ToSurvey()
		if err != nil {
			http.Error(w, "405, error creating survey." + err.Error(), http.StatusBadRequest)
			return
		}
		_, err = ctx.SurveysStore.Insert(sur)
		if err != nil {
			http.Error(w, "405, error inserting new survey." + err.Error(), http.StatusBadRequest)
			return
		}
		
		// Respond to the client with:
		// A status code of http.StatusCreated (201).
		w.WriteHeader(200)

		//fmt.Fprintf(w, "Congrats! Insert Survey handler works!")
		//return
	}
}

// Receives: Local storage
// Returns: Recommendations based on survey, returns local storage object
func (ctx *HandlerContext) RecommendationsHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/recommendations" {
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
		if data.SurveyCompleted != true {
			http.Error(w, "405, user has not completed survey.", http.StatusNotFound)
				return
		}
		//

		//fmt.Fprintf(w, "Congrats! Recommendations handler works!")
		//return
	}
}