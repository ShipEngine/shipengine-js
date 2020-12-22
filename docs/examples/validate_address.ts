/* validate_address.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);


/* wrapper start */
(async () => {


/* validate address args */
const isValid = await shipengine.validateAddress({
  street: '1 E 161 St',
  cityLocality: 'The Bronx',
  postalCode: '10451',
  stateProvince: 'NY',
  country: 'US',
});

console.log(isValid)
console.assert(isValid, 'address should be valid');


/* wrapper end */
})()


