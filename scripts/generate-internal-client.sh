#!/bin/bash

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
  -i https://github.com/ShipEngine/shipengine-openapi/blob/master/openapi.yaml?raw=true \
  --skip-validate-spec --generator-name typescript-fetch -o /local/src/services-internal/generated
