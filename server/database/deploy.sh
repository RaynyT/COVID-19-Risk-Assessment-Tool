#./build.sh

docker push covidaware/radb

# ssh into server instance
ssh -t -t raynat6@riskaware.ischool.uw.edu < update.sh