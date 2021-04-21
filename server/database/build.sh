#!/bin/bash

GOOS=linux go build
go build .
docker build -t COVID-19-Risk-Assessment-Tool/server/gateway .
go clean



# build go executable for linux
# GOOS=linux go build

# docker build -t kjmasumo/servers .
# cd ../db
# docker build -t kjmasumo/db .
# cd ../gateway

## delete Go executable
# go clean