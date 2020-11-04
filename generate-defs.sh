#!/bin/sh
openapi-generator -skip-validate-spec -i openapi.yml -g ts -o /tmp/test/
