import { ShipEngine } from '../../../cjs/shipengine';
import { Hoverfly } from '../../utils/Hoverfly';
import { expect } from 'chai';
import constants from '../../utils/constants';

let shipengine: ShipEngine;
describe('address', () => {
  before(async () => {
    await Hoverfly.start();
    await Hoverfly.import('rpc/rpc.json');
    shipengine = new ShipEngine('MY_API_KEY', `${constants.hoverflyBaseUrl}`);
  });
  after(async () => {
    await Hoverfly.stop();
  });

  const address = {
    countryCode: 'US',
    street: ['104'],
    cityLocality: 'Chicago',
    postalCode: '78751',
  };
  it('should work with validateAddress', async () => {
    const response = await shipengine.validateAddress(address);
    expect(response).to.eq('foo');
  });
  it('should work with address.validate', async () => {
    const response = await shipengine.address.validate(address);
    expect(response.name).to.eq('foo');
  });
});
