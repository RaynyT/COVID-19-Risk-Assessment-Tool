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

	//"server/gateway/handlers"
	//"server/gateway/models/users"
)

func main() {
	fmt.Println("Hey it's up.")

	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":80"
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

	fs := http.FileServer(http.Dir("../../../covrt/build"))
	http.Handle("/", fs)

	log.Printf("Server is listening at %s", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}