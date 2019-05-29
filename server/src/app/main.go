package main

import (
	"log"
	"net/http"
	"os"

	"github.com/mongodb/mongo-go-driver/mongo"
	"github.com/mongodb/mongo-go-driver/bson/primitive"
)

type Player struct{
	ID          primitive.ObjectID  `json:"_id,omitempty" bson:"_id,omitempty"`
	Playername  string              `json:"playername,omitempty" bson:"playername,omitempty"`
}

var client *mongo.Client

func main() {

	port := os.Getenv("PORT")
	
	

	// simplified way to serve a static page. we will remove this later.
	fs := http.FileServer(http.Dir("dist"))
	http.Handle("/", fs)

	// http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 	log.Println("Hello, Kevin!")
	// }))

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	log.Printf("Server is now running on Port %v\n", port)
	http.ListenAndServe(":"+port, nil)
}
