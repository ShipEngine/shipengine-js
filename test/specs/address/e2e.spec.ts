import { ShipEngine } from '../../../src/shipengine';
import { expect } from 'chai';
import constants from '../../utils/constants';
import { Address } from '../../../src/core/address/entities';

let shipengine: ShipEngine;
describe('address', () => {
  before(async () => {
    shipengine = new ShipEngine('MY_API_KEY', `${constants.isomorphicBaseUri}`);
  });

  const address = {
    countryCode: 'US',
    street: ['104'],
    cityLocality: 'Chicago',
    postalCode: '78751',
  };

  const assertAddress = (address: Address) => {
    expect(typeof address.cityLocality).to.eq('string');
    expect(typeof address.postalCode).to.eq('string');
    expect(['null', 'boolean'].includes(typeof address.residential)).to.be.true;
    expect(Array.isArray(address.street)).to.eq(true);
  };

  it('should work with validateAddress', async () => {
    const response = await shipengine.validateAddress(address);
    assertAddress(response);
  });
  it('should work with address.validate', async () => {
    const response = await shipengine.address.validate(address);
    response.map((el) => assertAddress(el.address));
  });
});
