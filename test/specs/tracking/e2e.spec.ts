import { ShipEngine } from '../../../src/shipengine';
import { Hoverfly } from '../../utils/Hoverfly';
import { expect } from 'chai';
import constants from '../../utils/constants';
import { TrackPackageResult } from '../../../src/core/packages/types/track-package.entities';

let shipengine: ShipEngine;
describe('tracking', () => {
  before(async () => {
    await Hoverfly.start();
    await Hoverfly.import('rpc/rpc.json');
    shipengine = new ShipEngine('MY_API_KEY', `${constants.hoverflyBaseUrl}`);
  });
  after(async () => {
    await Hoverfly.stop();
  });

  const assertTracking = (response: TrackPackageResult) => {
    expect(response.information.events).to.be.an('array').that.is.not.empty;
    expect(response.information.events.length).to.be.greaterThan(0);
    expect(response.information.events[0].dateTime.toString()).to.be.a(
      'string'
    );
    expect(response.information.estimatedDelivery.toString()).to.be.a('string');
    expect(response.information.estimatedDelivery.hasTimeZone).to.be.a(
      'boolean'
    );
  };

  it('should have a date', async () => {
    {
      const response = await shipengine.trackPackage({
        packageId: 'abc',
        carrierCode: '123',
      });
      assertTracking(response);
    }
    {
      const response = await shipengine.package.track({
        packageId: 'abc',
        carrierCode: '123',
      });
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
    {
      const response = await shipengine.package.track({
        packageId: 'abc',
        carrierCode: '123',
      });
      assertTracking(response);
    }
  });
});
