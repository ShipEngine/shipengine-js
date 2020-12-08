/* query_address.ts */
/* initialize */
/* import ShipEngine from 'shipengine'; */
/* warning: below is an internal import for example purposes, use module import ^ in your code */
import ShipEngine from '../../src';

const shipengine = ShipEngine('my_api_key');

/* query address */
const addressQuery = shipengine
  .queryAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
  })
  .then((queryResult) => {
    console.log(
      `the query result had ${queryResult.exceptions.length} exceptions.`
    );
    console.log(
      `the normalized address is: ${JSON.stringify(queryResult.normalized)}.`
    );
  });
