/* normalize_address.ts */
/* initialize normalize */
import { default as ShipEngine, ShipEngineError } from '../../src';

import 'dotenv/config';
const shipengine = ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* normalize address args */
  try {
    const address = await shipengine.normalizeAddress({
      street: ['1060 W Addison St'],
      cityLocality: 'Chicago',
      stateProvince: 'IL',
      country: 'US',
    });
    console.log(`normalized street is: ${address.street}`);
    console.assert(!address.isResidential, 'should be commercial');
  } catch (err) {
    console.error(err);
  }

  /* exception handling */
  try {
    await shipengine.normalizeAddress({ street: '1234 Main St' });
  } catch (err) {
    if (err instanceof ShipEngineError) {
      console.assert(err !== undefined, 'should be a ShipEngine error');
    } else {
      console.error(err);
    }
  }

  /* wrapper end */
})();
