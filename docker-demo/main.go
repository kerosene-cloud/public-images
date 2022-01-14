package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

func main() {
	// Get default port from environment variable
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		port = 3000
	}

	// Create the http file server
	fs := http.FileServer(http.Dir("./html"))
	http.HandleFunc("/", logRequests(fs))
	log.Printf("Listening on port :%d...", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

func logRequests(wrapped http.Handler) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL)
		wrapped.ServeHTTP(w, r)
	}
}
