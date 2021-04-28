package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":443"
	}

	tlsCertPath := os.Getenv("TLSCERT")
	tlsKeyPath := os.Getenv("TLSKEY")
	if len(tlsCertPath) == 0 || len(tlsKeyPath) == 0 {
		os.Stdout.WriteString("Error authenticating.")
		os.Exit(3)
	}

	mux := http.NewServeMux()

	log.Printf("server is listening at %s", addr)
	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
}