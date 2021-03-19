import { ShipEngine } from '../../../src/shipengine';
import { expect } from 'chai';
import constants from '../../utils/constants';
import {
  Address,
  ValidateAddressConvenienceResult,
} from '../../../src/core/address/entities';
import { Messages } from '../../../src/shared/models/messsages';

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
    expect(address).to.be.an('object');
    expect(typeof address.cityLocality).to.eq('string');
    expect(typeof address.postalCode).to.eq('string');
    expect(['null', 'boolean'].includes(typeof address.isResidential)).to.be
      .true;
    expect(Array.isArray(address.street)).to.eq(true);
  };

  const assertMessages = (m: Messages) => {
    expect(m).to.be.an('object');
    expect(m.errors).to.be.an('array');
    expect(m.info).to.be.an('array');
    expect(m.warnings).to.be.an('array');
  };

  describe('validateAddress', () => {
    let response: ValidateAddressConvenienceResult;
    before(async () => {
      response = await shipengine.validateAddress(address);
    });
    it('isValid should be the right type', () => {
      expect(response.isValid).to.be.a('boolean');
    });
    it('should have an normalized address with the correct shape', () => {
      assertAddress(response.normalized);
    });

    it('should have messages with the correct shape', () => {
      assertMessages(response.messages);
    });

    it('should have a response with the correct shape', () => {
      assertAddress(response.original);
    });
  });

  it.skip('address.validate', async () => {
    const response = await shipengine.address.validate(address);
    response.map((el) => assertAddress(el.normalized));
  });
});
