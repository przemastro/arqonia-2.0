#!/bin/bash

cd ../../docker

rm -rf jar/
mkdir mongo-password spring-encrypt-key jar mongo-import/dump environment

# SET UP CORRECT ENVIRONMENT VERSION (PROD/TEST/DEV and so on...)
echo local > environment/environment_name.txt

cp -r ../src/main/resources/passwords/docker/secrets/* mongo-password/
cp -r ../src/main/resources/passwords/spring/encryption/key/* spring-encrypt-key/
cp -r ../build/libs/* jar/
cp -r ../src/main/resources/mongo/dump/* mongo-import/dump/

docker-compose --verbose -f docker-compose-unix.yml up
