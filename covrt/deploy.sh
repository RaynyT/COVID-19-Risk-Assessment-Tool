./build.sh

docker push covidaware/calculator

# ssh into server instance
scp ./update.sh raynat6@riskaware.ischool.uw.edu:~/bin/update_calculator.sh
ssh -t -t raynat6@riskaware.ischool.uw.edu ./bin/update_calculator.sh