sudo docker stop gateway
sudo docker rm -f gateway
sudo docker pull covidaware/gateway

export TLSCERT=/etc/letsencrypt/live/riskaware.ischool.uw.edu/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/riskaware.ischool.uw.edu/privkey.pem
export MYSQL_PASSWORD=""

sudo -E docker run \
    -d \
    -p 443:443 \
    --name gateway \
    --network ra_net \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_PASSWORD \
    -e MYSQL_DATABASE="radb" \
    -e DSN="root:$MYSQL_PASSWORD@tcp(172.18.0.3:3306)/radb" \
    covidaware/gateway