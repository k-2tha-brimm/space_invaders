package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello, Kevin!")
	}))

	log.Println("Now server is running on Port 3000")
	http.ListenAndServe(":3000", nil)
}