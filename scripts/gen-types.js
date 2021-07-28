const { compileFromFile } = require('json-schema-to-typescript');
const fs = require('fs');

// Validate Address
compileFromFile('node_modules/shipengine-json-schema/requests/validate_address_request_body.json')
  .then(ts => fs.writeFileSync('src/validate-addresses/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/validate_address_response_body.json')
  .then(ts => fs.writeFileSync('src/validate-addresses/types/private-response.ts', ts))

// Create Label
compileFromFile('node_modules/shipengine-json-schema/requests/create_label_request_body.json')
  .then(ts => fs.writeFileSync('src/create-label/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/create_label_response_body.json')
  .then(ts => fs.writeFileSync('src/create-label/types/private-response.ts', ts))

// Create Label By Rate ID
compileFromFile('node_modules/shipengine-json-schema/requests/create_label_from_rate_request_body.json')
  .then(ts => fs.writeFileSync('src/create-label-from-rate/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/create_label_from_rate_response_body.json')
  .then(ts => fs.writeFileSync('src/create-label-from-rate/types/private-response.ts', ts))

// List Rates
compileFromFile('node_modules/shipengine-json-schema/requests/calculate_rates_request_body.json')
  .then(ts => fs.writeFileSync('src/get-rates/types/private-request.ts', ts))

compileFromFile('node_modules/shipengine-json-schema/responses/calculate_rates_response_body.json')
  .then(ts => fs.writeFileSync('src/get-rates/types/private-response.ts', ts))

// List Carrier Accounts
compileFromFile('node_modules/shipengine-json-schema/responses/list_carriers_response_body.json')
  .then(ts => fs.writeFileSync('src/list-carrier-accounts/types/private-response.ts', ts))

// Track By Carrier Code and Tracking Number
compileFromFile('node_modules/shipengine-json-schema/responses/get_tracking_log_response_body.json')
  .then(ts => fs.writeFileSync('src/track-by-carrier-code-and-tracking-number/types/private-response.ts', ts))

// Track By Label ID
compileFromFile('node_modules/shipengine-json-schema/responses/get_tracking_log_from_label_response_body.json')
  .then(ts => fs.writeFileSync('src/track-by-label-id/types/private-response.ts', ts))

// Void Label
compileFromFile('node_modules/shipengine-json-schema/responses/void_label_response_body.json')
  .then(ts => fs.writeFileSync('src/void-label-by-id/types/private-response.ts', ts))
