./build.sh

docker push riskaware/radb

# ssh into server instance
ssh raynat6@riskaware.ischool.uw.edu < update.sh