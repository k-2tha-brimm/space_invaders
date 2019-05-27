package main

import (
	"log"
	"net/http"
	"os"
)

func main() {

	port := os.Getenv("PORT")

	// http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 	log.Println("Hello, Kevin!")
	// }))

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	log.Printf("Now server is running on Port %v\n", port)
	http.ListenAndServe(":" + port, nil)
}