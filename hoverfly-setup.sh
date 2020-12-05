#!/bin/bash

hoverctl stop

docker run -d -p 8500:8888 \
    spectolabs/hoverfly:latest \
    -webserver \
    -response-body-files-path simengine
