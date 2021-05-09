#!/bin/bash
# Builds the Docker container
GOOS=linux CGO_ENABLED=0 go build -o gateway
# Builds the Docker container
docker build -t covidaware/gateway ../../../.
# Deletes the Go executable for Linux using go clean, 
# so that it doesn't end up getting added to your repo

# This is deleting the go binary before it can use it to create the docker image
# go clean