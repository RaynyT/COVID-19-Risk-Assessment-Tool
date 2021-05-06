sudo docker stop calculator
sudo docker rm -f calculator
sudo docker pull covidaware/calculator

sudo -E docker run \
    -d \
    -p 443:443 \
    -p 80:80 \
    --name calculator \
    --network ra_net \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    covidaware/calculator