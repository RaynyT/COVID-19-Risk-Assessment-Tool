sudo docker stop gateway
sudo docker rm -f gateway
sudo docker pull covidaware/gateway

sudo -E docker run \
    -d \
    -p 443:443 \
    -p 80:80 \
    --name gateway \
    --network ra_net \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    covidaware/gateway