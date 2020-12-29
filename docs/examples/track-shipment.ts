/* track-shipment.ts */
/* initialize */
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);

/* wrapper start */
(async () => {
  /* one */
  const { estimatedDelivery, events } = await shipengine.trackShipment({
    trackingNumber: '1Z97643X0347662293',
    carrierCode: 'ups',
  });

  console.assert(
    estimatedDelivery !== undefined,
    'should have an estimated delivery'
  );
  console.assert(events.length, 'should have tracking events');

  /* two */
  const result = await shipengine.trackShipment('se-ABC123');
  console.assert(result !== undefined);

  /* three */
  try {
    await shipengine.trackShipment('se-IDONTEXIST');
    console.error('should throw an error; execution should not reach here');
  } catch (err) {
    console.assert(err.type === 'error');
    console.assert(
      err.message !== undefined,
      'error should have message field'
    );
  }

  /* wrapper end */
})();
