/* query-address.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* query address */
  const result = await shipengine.queryAddress({
    street: ['1 E 161 St'],
    cityLocality: 'The Bronx',
    stateProvince: 'NY',
    postalCode: '10451',
    country: 'US',
  });

  console.assert(!result.exceptions.length, 'should be no exceptions');
  console.log(
    `the normalized address is: ${JSON.stringify(result.normalized)}.`
  );

  /* wrapper end */
})();
