#!/bin/bash

hoverctl stop
hoverfly -webserver -response-body-files-path simengine &
hoverctl import simengine/v1/tags.json
