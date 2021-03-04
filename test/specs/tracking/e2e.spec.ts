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
    expect(Array.isArray(response.information.events)).to.eq(true);
    expect(response.information.events.length).to.be.greaterThan(0);
  };

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
