/* normalize_address.ts */
/* initialize normalize */
import { default as ShipEngine, ShipEngineError } from '../../src';

const shipengine = ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* normalize address args */
  const address = await shipengine.normalizeAddress({
    street: ['1 E 161 St'],
    cityLocality: 'The Bronx',
    stateProvince: 'NY',
    country: 'US',
  });

  console.log(`normalized street is: ${address.street}`);
  console.log(`is residential: ${address.isResidential}`);

  /* exception handling */
  try {
    await shipengine.normalizeAddress({ street: '1234 Main St' });
  } catch (err) {
    if (err instanceof ShipEngineError) {
      // do something
    } else {
      console.error('some http error.', err);
    }
  }

  /* wrapper end */
})();
