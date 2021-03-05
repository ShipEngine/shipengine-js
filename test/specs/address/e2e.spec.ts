import { ShipEngine } from '../../../src/shipengine';
import { Hoverfly } from '../../utils/Hoverfly';
import { expect } from 'chai';
import constants from '../../utils/constants';
import { ValidateAddressResult } from '../../../src/core/address/types/validate-address';

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

  const assertAddress = (response: ValidateAddressResult[0]) => {
    expect(typeof response.address.latitude).to.eq('number');
    expect(typeof response.address.latitude).to.eq('number');
    expect(typeof response.address.cityLocality).to.eq('string');
    expect(typeof response.address.postalCode).to.eq('string');
    expect(['null', 'boolean'].includes(typeof response.address.residential)).to
      .be.true;
    expect(Array.isArray(response.address.street)).to.eq(true);
  };

  it('should work with validateAddress', async () => {
    const response = await shipengine.validateAddress(address);
    assertAddress(response);
  });
  it('should work with address.validate', async () => {
    const response = await shipengine.address.validate(address);
    assertAddress(response);
  });
});
