/* query_address.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

const shipengine = ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
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

  /* wrapper end */
})();
