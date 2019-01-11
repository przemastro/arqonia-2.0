#!/bin/bash

mongoImage=mongo:3.6
arqoniaBuildImage=arqonia_build_and_run

docker rm $(docker stop $(docker ps -a -q --filter ancestor=$mongoImage --format="{{.ID}}"))
docker rm $(docker stop $(docker ps -a -q --filter ancestor=$arqoniaBuildImage --format="{{.ID}}"))

docker rmi $(docker images --format '{{.Repository}}' | grep $arqoniaBuildImage)