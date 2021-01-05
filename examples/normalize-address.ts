/* normalize-address.ts */
/* initialize normalize */
import { default as ShipEngine, ShipEngineError } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* normalize address args */
  try {
    const result = await shipengine.normalizeAddress({
      street: ['1060 W Addison St'],
      cityLocality: 'Chicago',
      stateProvince: 'IL',
      country: 'US',
    });
    console.log(`normalized street is: ${result.street}`);
    console.assert(!result.isResidential, 'should be commercial');
  } catch (err) {
    console.error(err);
  }

  /* exception handling */
  try {
    await shipengine.normalizeAddress({ street: '1234 Main St' });
  } catch (err) {
    if (err instanceof ShipEngineError) {
      console.assert(
        err !== undefined,
        'address query missing too much information'
      );
    } else {
      // unable to complete request at all (e.g. network connection)
      console.error(err);
    }
  }

  /* wrapper end */
})();
