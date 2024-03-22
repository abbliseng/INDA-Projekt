sudo docker run --name ddagen-db -p 5432:5432 \
    -e POSTGRES_PASSWORD=dkm \
    -e POSTGRES_DB=dkm \
    -e POSTGRES_USER=dkm \
    -v /mnt/dkm_database/:/var/lib/postgresql/data \
    postgres

<<<<<<< HEAD
sudo docker rm ddagen-db
=======
docker rm ddagen-db
>>>>>>> 2bfeefb2cfc94a835ccd41bc9a6faa0d5c2136e2

# postgres://dkm:dkm@localhost:5432/dkm
