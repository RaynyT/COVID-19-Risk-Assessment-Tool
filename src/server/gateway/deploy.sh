./build.sh

docker push covidaware/gateway

# ssh into server instance
# scp -r ../../../covrt/build raynat6@riskaware.ischool.uw.edu:~/
scp ./update.sh raynat6@riskaware.ischool.uw.edu:~/deploy_gateway.sh
ssh -t -t raynat6@riskaware.ischool.uw.edu ./deploy_gateway.sh