sudo docker run --name ddagen-db -p 5432:5432 \
    -e POSTGRES_PASSWORD=dkm \
    -e POSTGRES_DB=dkm \
    -e POSTGRES_USER=dkm \
    -v /mnt/dkm_database/:/var/lib/postgresql/data \
    postgres

sudo docker rm ddagen-db

# postgres://dkm:dkm@localhost:5432/dkm
