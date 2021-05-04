package main

import (
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"COVID-19-Risk-Assessment-Tool/server/gateway/models/activities"
	"COVID-19-Risk-Assessment-Tool/server/gateway/models/demographics"
	"COVID-19-Risk-Assessment-Tool/server/gateway/models/statecounty_rates"
	"COVID-19-Risk-Assessment-Tool/server/gateway/models/surveys"
	"COVID-19-Risk-Assessment-Tool/server/gateway/models/users"
)

//main is the main entry point for the server
func main() {
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":80"
	}

	TLSKEY := os.Getenv("TLSKEY")
	TLSCERT := os.Getenv("TLSCERT")

	mux := http.NewServeMux()
	
	corsMux := &handlers.CORS{Handler: mux}
	log.Fatal(http.ListenAndServeTLS(addr, TLSCERT, TLSKEY, corsMux))
}