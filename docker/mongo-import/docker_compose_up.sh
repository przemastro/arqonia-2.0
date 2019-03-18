#!/bin/bash

cp -r ../src/main/resources/passwords/spring/encryption/key/ spring-encrypt-key/
cp -r ../build/libs/ jar/
cp -r ../src/main/resources/mongo/dump/ mongo-import/dump/
docker-compose --verbose -f docker-compose-unix.yml up
