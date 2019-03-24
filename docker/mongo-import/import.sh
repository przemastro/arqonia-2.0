#!/bin/bash

password=`cat /mongo-password/db_password.txt | xargs`

mongorestore --host mongo -u abekalarz -p ${password} /mongo-import/dump
