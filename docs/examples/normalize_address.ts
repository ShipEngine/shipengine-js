/* normalize_address.ts */
/* initialize */
/* import ShipEngine from 'shipengine'; */
/* warning: below is an internal import for example purposes, use module import ^ in your code */
import ShipEngine from '../../src';

const shipengine = ShipEngine('my_api_key');

/* normalize address args */
shipengine
  .normalizeAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    stateProvince: 'NY',
  })
  .then((address) => {
    console.log(`normalized street is: ${address.street}`);
    console.log(`is residential: ${address.isResidential}`);
  });

/* exception handling */
shipengine
  .normalizeAddress({ street: '1234 Main St' })
  .catch((err) => console.error('exception!'));

/* normalize address service */
shipengine.addresses
  .normalize([
    { street: '1234 Main St' },
    {
      street: ['1 E 161 St'],
      country: 'US',
      cityLocality: 'The Bronx',
      stateProvince: 'NY',
    },
  ])
  .then(([addr1, addr2]) => {
    console.assert(addr1 === undefined, 'first address cannot be normalized');
    console.assert(!!addr2, 'second address should be valid');
  });
