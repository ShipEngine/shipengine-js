/* query_address.ts */
/* initialize */
import ShipEngine from 'shipengine';

const shipengine = ShipEngine('my_api_key');

/* query address */
const addressQuery = await shipengine.queryAddress({
  street: ['1 E 161 St'],
  country: 'US',
  cityLocality: 'The Bronx',
  postalCode: '10451',
  stateProvince: 'NY',
});

console.log(
  `the query result had ${addressQuery.exceptions.length} exceptions.`
);
console.log(
  `the normalized address is: ${JSON.stringify(addressQuery.normalized)}.`
);
