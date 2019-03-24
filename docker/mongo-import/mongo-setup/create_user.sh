#!/usr/bin/env bash

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
var user = '$MONGO_ARQONIA_USERNAME';
var password = '$MONGO_INITDB_ROOT_PASSWORD';
var database = '$MONGO_INITDB_DATABASE';

db.createUser({user: user, pwd: password, roles: [{role: "readWrite", db: database}]});
EOF
