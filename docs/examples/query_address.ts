/* query_address.ts */
/* initialize */
import ShipEngine from 'shipengine';

const shipengine = ShipEngine('my_api_key');

/* query address */
const addressQuery = await shipengine.queryAddress({
  street: ['1 E 161 St'],
  cityLocality: 'The Bronx',
  stateProvince: 'NY',
  postalCode: '10451',
  country: 'US',
});

console.log(
  `the query result had ${addressQuery.exceptions.length} exceptions.`
);
console.log(
  `the normalized address is: ${JSON.stringify(addressQuery.normalized)}.`
);
