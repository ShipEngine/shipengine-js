const { compileFromFile } = require('json-schema-to-typescript');
const fs = require('fs');

// Validate Address
compileFromFile('node_modules/shipengine-json-schema/requests/validate_address_request_body.json')
  .then(ts => fs.writeFileSync('src/validate-address/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/validate_address_response_body.json')
  .then(ts => fs.writeFileSync('src/validate-address/types/private-response.ts', ts))

// Create Label
compileFromFile('node_modules/shipengine-json-schema/requests/create_label_request_body.json')
  .then(ts => fs.writeFileSync('src/create-label/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/create_label_response_body.json')
  .then(ts => fs.writeFileSync('src/create-label/types/private-response.ts', ts))

// Create Label By Rate ID
compileFromFile('node_modules/shipengine-json-schema/requests/create_label_from_rate_request_body.json')
  .then(ts => fs.writeFileSync('src/create-label-by-rate-id/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/create_label_from_rate_response_body.json')
  .then(ts => fs.writeFileSync('src/create-label-by-rate-id/types/private-response.ts', ts))

// List Rates
compileFromFile('node_modules/shipengine-json-schema/requests/calculate_rates_request_body.json')
  .then(ts => fs.writeFileSync('src/list-rates/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/calculate_rates_response_body.json')
  .then(ts => fs.writeFileSync('src/list-rates/types/private-response.ts', ts))

// List Carriers
compileFromFile('node_modules/shipengine-json-schema/responses/list_carriers_response_body.json')
  .then(ts => fs.writeFileSync('src/list-carriers/types/private-response.ts', ts))
