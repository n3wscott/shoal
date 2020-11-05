package main

import (
	"encoding/json"
	"net/http"
)

func hello(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{
		"text": "hello " + req.URL.String(),
	})
}

func main() {

	http.HandleFunc("/", hello)

	http.ListenAndServe(":4000", nil)
}
