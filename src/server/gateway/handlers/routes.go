package handlers

import (
	"fmt"
	"net/http"
)

// Bare min functions defined, need to discuss more

// GET ROUTES -- Chris figure out states
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

// POST ROUTES -- Chris what data are you sending me in each json?
func RecommendationsHandler(w http.ResponseWriter, r *http.Request) {
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

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/register" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "Congrats! Register handler works!")
		return
	}
}

func InsertSurveyHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/insert_survey" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.ServeFile(w, r, "build/index.html")
		//fmt.Fprintf(w, "Congrats! Insert Survey handler works!")
		return
	}
}

func RetrieveSurveyHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/retrieve_survey" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "Congrats! Retrieve Survey handler works!")
		return
	}
}

func UpdateDemographicsHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/update_demographics" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "Congrats! Update Demographics handler works!")
		return
	}
}

func Retrieve_SuggestionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/retrieve_suggestions" {
		http.Error(w, "405, Page Not Found", http.StatusNotFound)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "406, Header Method Not Supported", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "Congrats! Retrieve Suggestions handler works!")
		return
	}
}