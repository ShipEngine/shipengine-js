import { ShipEngine } from '../../../src/shipengine';
import { expect } from 'chai';
import constants from '../../utils/constants';
import { TrackPackageResult } from '../../../src/core/packages/types/track/entities';

let shipengine: ShipEngine;
describe('tracking', () => {
  before(async () => {
    shipengine = new ShipEngine('MY_API_KEY', constants.isomorphicBaseUri);
  });

  const assertTracking = (r: TrackPackageResult) => {
    expect(r.events).to.be.an('array').that.is.not.empty;
    expect(r.events.length).to.be.greaterThan(0);
    expect(r.events[0].dateTime.toString()).to.be.a('string');
    expect(r.shipment.estimatedDelivery.hasTimeZone).to.be.a('boolean');
  };

  it('should have a date', async () => {
    {
      const response = await shipengine.trackPackage({
        packageId: 'abc',
        carrierCode: '123',
      });
      response.events.map((v) => v.carrierDetailCode);
      assertTracking(response);
    }
  });

  it('should work with trackPackage', async () => {
    {
      const response = await shipengine.trackPackage({
        packageId: 'abc',
        carrierCode: '123',
      });
      assertTracking(response);
    }
  });
});
