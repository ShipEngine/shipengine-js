/* validate_address.ts */
/* initialize */
/* import ShipEngine from 'shipengine'; */
/* warning: below is an internal import for example purposes, use module import ^ in your code */
import ShipEngine from '../../src';

const shipengine = ShipEngine('my_api_key');

/* validate address args */
shipengine
  .validateAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
  })
  .then((isValid) => console.log(isValid ? 'valid!' : 'invalid!'));

/* validate address service */
shipengine.addresses
  .validate([
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
      country: 'US',
    },
  ])
  .then(([isValid1, isValid2]) => {
    console.log(isValid1 && isValid2 ? 'all are valid' : 'some are invalid');
  });
