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
	//_ "github.com/go-sql-driver/mysql"
	"server/gateway/handlers"
	//"server/gateway/models/users"
)

func main() {
	fmt.Println("Hey it's up.")

	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":80"
		// Debugging
		//addr = ":3000"
	}

	// Not worried about https currently
	//tlsCertPath := os.Getenv("TLSCERT")
	//tlsKeyPath := os.Getenv("TLSKEY")
	/*
	if len(tlsCertPath) == 0 || len(tlsKeyPath) == 0 {
		os.Stdout.WriteString("Error authenticating.")
		os.Exit(3)
	}
	*/

	//dsn := os.Getenv("DSN")
	//db, _ := sql.Open("mysql", dsn)

	//myUserStore := users.NewUserStore(db)

	fs := http.FileServer(http.Dir("build"))
	// Debugging
	//fs := http.FileServer(http.Dir("../../../covrt/build"))

	// main page
	http.Handle("/", fs)

	// get requests -- Need Chris's input
	http.HandleFunc("/about", handlers.AboutHandler)
	http.HandleFunc("/faq", handlers.FAQHandler)
	http.HandleFunc("/contact-us", handlers.ContactHandler)
	http.HandleFunc("/get-started", handlers.TutorialHandler)
	http.HandleFunc("/dashboard", handlers.DashboardHandler)
	http.HandleFunc("/calculator", handlers.CalculatorHandler)
	http.HandleFunc("/results", handlers.ResultsHandler)
	http.HandleFunc("/update", handlers.UpdateHandler)

	// post requests
	http.HandleFunc("/recommendations", handlers.RecommendationsHandler)
	http.HandleFunc("/register", handlers.RegisterHandler)
	http.HandleFunc("/insert_survey", handlers.InsertSurveyHandler)
	http.HandleFunc("/retrieve_survey", handlers.RetrieveSurveyHandler)
	http.HandleFunc("/update_demographics", handlers.UpdateDemographicsHandler)
	http.HandleFunc("/retrieve_suggestions", handlers.Retrieve_SuggestionsHandler)

	log.Printf("Server is listening at %s", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}