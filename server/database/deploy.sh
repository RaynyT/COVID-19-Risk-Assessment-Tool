./build.sh

docker push covidaware/radb

# ssh into server instance
scp ./update.sh raynat6@riskaware.ischool.uw.edu:~/bin/update.sh
ssh -t -t raynat6@riskaware.ischool.uw.edu ./bin/update.sh