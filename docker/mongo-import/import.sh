#!/bin/bash

mongo arqonia2 --host mongo /mongo-import/dump/create_user.js -u abekalarz -p arqoniaSuperPass12 --authenticationDatabase admin

#docker exec dbmongo mongo admin -u abekalarz -p arqoniaSuperPass12 < /mongo-import/dump/create_user.js
#
#docker exec db_mongodb  mongo myDb /setup/create-user.js -u admin -p admin --authenticationDatabase admin

#mongorestore --host mongo -u abekalarz -p arqoniaSuperPass12 /mongo-import/dump
