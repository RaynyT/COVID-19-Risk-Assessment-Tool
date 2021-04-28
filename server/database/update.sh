sudo docker pull covidaware/radb
sudo docker rm -f radatabase

sudo -E docker run \
    -d \
    -p 3306:3306 \
    --name radatabase \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e MYSQL_ROOT_PASSWORD="testpassword12345" \
    -e MYSQL_DATABASE="radb" \
    #--network ranetwork \
    covidaware/radb
exit