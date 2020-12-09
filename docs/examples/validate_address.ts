/* validate_address.ts */
/* initialize */
import ShipEngine from 'shipengine';

const shipengine = ShipEngine('my_api_key');

/* validate address args */

const isValid = await shipengine.validateAddress({
  street: ['1 E 161 St'],
  country: 'US',
  cityLocality: 'The Bronx',
  postalCode: '10451',
  stateProvince: 'NY',
});

console.log(isValid ? 'valid!' : 'invalid!');

/* validate address service */
const [isValid1, isValid2] = shipengine.addresses.validate([
  {
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
  },
  {
    street: ['4009 Marathon Blvd', 'Suite 200'],
    country: 'US',
    cityLocality: 'The Bronx',
    stateProvince: 'TX',
  },
]);

console.log(isValid1 && isValid2 ? 'all are valid' : 'some are invalid');
