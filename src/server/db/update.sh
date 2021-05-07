sudo docker pull covidaware/radb
sudo docker stop radatabase
sudo docker rm -f radatabase

sudo -E docker run \
    -d \
    -p 3306:3306 \
    --netowrk ra_net \
    --name radatabase \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e MYSQL_ROOT_PASSWORD="testpassword12345" \
    -e MYSQL_DATABASE="radb" \
    covidaware/radb