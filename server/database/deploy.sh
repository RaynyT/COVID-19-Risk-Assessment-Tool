./build.sh

docker push covidaware/radb

# ssh into server instance
ssh raynat6@riskaware.ischool.uw.edu < update.sh