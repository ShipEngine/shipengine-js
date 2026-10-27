const { compileFromFile } = require('json-schema-to-typescript');
const fs = require('fs');

const options = { ignoreMinAndMaxItems: true };
const schemas = 'node_modules/shipengine-json-schema';

// [schema path, output file]
const jobs = [
  // Validate Address
  ['requests/validate_address_request_body.json', 'src/validate-addresses/types/private-request.ts'],
  ['responses/validate_address_response_body.json', 'src/validate-addresses/types/private-response.ts'],
  // Create Label
  ['requests/create_label_request_body.json', 'src/create-label-from-shipment-details/types/private-request.ts'],
  ['responses/create_label_response_body.json', 'src/create-label-from-shipment-details/types/private-response.ts'],
  // Create Label By Rate ID
  ['requests/create_label_from_rate_request_body.json', 'src/create-label-from-rate/types/private-request.ts'],
  ['responses/create_label_from_rate_response_body.json', 'src/create-label-from-rate/types/private-response.ts'],
  // List Carrier Accounts
  ['responses/list_carriers_response_body.json', 'src/list-carriers/types/private-response.ts'],
  // Get Rates
  ['requests/calculate_rates_request_body.json', 'src/get-rates-with-shipment-details/types/private-request.ts'],
  ['responses/calculate_rates_response_body.json', 'src/get-rates-with-shipment-details/types/private-response.ts'],
  // Track By Carrier Code and Tracking Number
  ['responses/get_tracking_log_response_body.json', 'src/track-using-carrier-code-and-tracking-number/types/private-response.ts'],
  // Track Using Label ID
  ['responses/get_tracking_log_from_label_response_body.json', 'src/track-using-label-id/types/private-response.ts'],
  // Void Label
  ['responses/void_label_response_body.json', 'src/void-label-with-label-id/types/private-response.ts'],
];

Promise.all(
  jobs.map(async ([schema, out]) => {
    const ts = await compileFromFile(`${schemas}/${schema}`, options);
    await fs.promises.writeFile(out, ts);
  })
).catch((err) => {
  console.error(err);
  process.exit(1);
});
