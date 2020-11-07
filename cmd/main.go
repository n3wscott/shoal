package main

import (
	"encoding/json"
	"net/http"

	"github.com/n3wscott/shoal/pkg/api"
)

func hello(w http.ResponseWriter, req *http.Request) {
    state := &api.State{
		Title:      req.URL.String(),
		Message:    "TODO: some real data here",
		Conditions: []api.Conditions{{
			Status: "True",
			Type: "OwnersFile",
			Reason:   "Owners file up to date.",
		},{
			Status: "False",
			Type: "ReleaseBranch",
			Reason:   "Release branch does not exist.",
		},{
			Status: "Unknown",
			Type: "ReleaseApproved",
			Reason:   "The release has no tags.",
		}},
	}

	json.NewEncoder(w).Encode(state)
}

func main() {

	http.HandleFunc("/", hello)

	http.ListenAndServe(":4000", nil)
}
