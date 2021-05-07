./build.sh

docker push covidaware/gateway

# ssh into server instance
scp ./update.sh raynat6@riskaware.ischool.uw.edu:~/bin/deploy_gateway.sh
ssh -t -t raynat6@riskaware.ischool.uw.edu ./bin/deploy_gateway.sh