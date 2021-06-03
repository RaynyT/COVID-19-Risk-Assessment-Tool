sudo docker pull covidaware/radb
sudo docker stop radatabase
sudo docker rm -f radatabase

export MYSQL_PASSWORD=""

sudo -E docker run \
    -d \
    -p 3306:3306 \
    --network ra_net \
    --name radatabase \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_PASSWORD \
    -e MYSQL_DATABASE="radb" \
    covidaware/radb