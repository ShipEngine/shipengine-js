/* track-shipment.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* one */
  try {
    const result = await shipengine.trackPackage({
      trackingNumber: '1Z12345E0205271688',
      carrierCode: 'ups',
    });
    console.assert(
      result.information.estimatedDelivery,
      'should have an estimated delivery'
    );
    console.assert(
      result.information.events.length,
      'should have tracking events'
    );
  } catch (err) {
    console.error(err);
  }
  /* wrapper end */
})();
