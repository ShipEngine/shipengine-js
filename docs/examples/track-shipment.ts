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

  /* two */
  try {
    const result = await shipengine.trackPackage('se-ABC123');
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

  /* three */
  try {
    await shipengine.trackShipment('se-IDONTEXIST');
  } catch (err) {
    console.error(err);
    console.assert(err.message, 'should have message field');
  }

  /* wrapper end */
})();
