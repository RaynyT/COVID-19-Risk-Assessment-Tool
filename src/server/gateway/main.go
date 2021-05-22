package main

import (
	//"database/sql"
	//"encoding/json"
	"log"
	"fmt"
	"net/http"
	//"net/http/httputil"
	//"net/url"
	"os"
	//"strings"
	//"sync/atomic"
	//"time"
	_ "github.com/go-sql-driver/mysql"
	"server/gateway/handlers"
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
)

func main() {
	fmt.Println("Hey it's up.")

	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":443"
		// Debugging
		//addr = ":3000"
	}

	// Not worried about https currently
	tlsCertPath := os.Getenv("TLSCERT")
	tlsKeyPath := os.Getenv("TLSKEY")
	
	if len(tlsCertPath) == 0 || len(tlsKeyPath) == 0 {
		os.Stdout.WriteString("Error authenticating.")
		os.Exit(3)
	}
	

	dsn := os.Getenv("DSN")

	activitiesStore, err := activities.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - Activity")
	}
	countiesStore, err := counties.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - County")
	}
	demographicsStore, err := demographics.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - Demographic")
	}
	distancesStore, err := distances.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - Distance")
	}
	inOutsStore, err := inouts.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - InOut")
	}
	othersMasksStore, err := othersmasks.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - OtherMasks")
	}
	selfMasksStore, err := selfmasks.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - SelfMask")
	}
	stateCountiesStore, err := statecounties.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - StateCounty")
	}
	stateCounty_RatesStore, err := statecounty_rates.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - StateCounty_Rate")
	}
	statesStore, err := states.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - State")
	}
	surveysStore, err := surveys.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - Survey")
	}
	usersStore, err := users.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - User")
	}
	vaccineTypesStore, err := vaccinetypes.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - VaccineType")
	}
	volumesStore, err := volumes.NewMySQLStore(dsn)
	if err != nil {
		log.Printf("Unable to create the db. - Volume")
	}

	hc := handlers.NewHandlerContext(activitiesStore, countiesStore, demographicsStore,
		                            distancesStore, inOutsStore, othersMasksStore, selfMasksStore,
								    stateCountiesStore, stateCounty_RatesStore, statesStore,
								    surveysStore, usersStore, vaccineTypesStore, volumesStore)

	// main page
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("build"))
	// Debugging
	//fs := http.FileServer(http.Dir("../../../covrt/build"))

	mux.Handle("/", fs)

	// get requests
	mux.HandleFunc("/about", handlers.AboutHandler)
	mux.HandleFunc("/faq", handlers.FAQHandler)
	mux.HandleFunc("/FAQ", handlers.FAQHandler)
	mux.HandleFunc("/contact-us", handlers.ContactHandler)
	mux.HandleFunc("/get-started", handlers.TutorialHandler)
	mux.HandleFunc("/dashboard", handlers.DashboardHandler)
	mux.HandleFunc("/calculator", handlers.CalculatorHandler)
	mux.HandleFunc("/results", handlers.ResultsHandler)
	mux.HandleFunc("/update", handlers.UpdateHandler)

	// post requests
	mux.HandleFunc("/recommendations", hc.RecommendationsHandler)
	mux.HandleFunc("/insert_survey", hc.InsertSurveyHandler)
	mux.HandleFunc("/insert_updated_survey", hc.InsertSurveyHandler)
	mux.HandleFunc("/retrieve_county_rates", hc.RetrieveCountyRatesHandler)

	wrappedMux := handlers.NewCORS(mux)

	log.Printf("Server is listening at %s", addr)
	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
}