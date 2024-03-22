docker run --name ddagen-db -p 5432:5432 \
    -e POSTGRES_PASSWORD=dkm \
    -e POSTGRES_DB=dkm \
    -e POSTGRES_USER=dkm \
    -v <path to persistence folder>:/var/lib/postgresql/data \
    postgres

docker rm ddagen-db

# postgres://dkm:dkm@localhost:5432/dkm
