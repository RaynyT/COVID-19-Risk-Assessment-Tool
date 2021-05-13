sudo docker stop gateway
sudo docker rm -f gateway
sudo docker pull covidaware/gateway

export TLSCERT=/etc/letsencrypt/live/riskaware.ischool.uw.edu/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/riskaware.ischool.uw.edu/privkey.pem

sudo -E docker run \
    -d \
    -p 443:443 \
    --name gateway \
    --network ra_net \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -e MYSQL_ROOT_PASSWORD="testpassword12345" \
    -e MYSQL_DATABASE="radb" \
    -e DSN="root:testpassword12345@tcp(mysqldatabase:3306)/radb" \
    covidaware/gateway