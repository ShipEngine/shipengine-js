#!/bin/bash

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
  -i https://github.com/ShipEngine/shipengine-openapi/blob/master/openapi.json?raw=true \
  --skip-validate-spec -g typescript-fetch -o /local/src/services-internal/generated \
  --additional-properties=npmName=ShipengineInternalClient,supportsES6=true,typescriptThreePlus=true,
