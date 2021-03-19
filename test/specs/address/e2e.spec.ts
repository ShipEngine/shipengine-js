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

  const assertResponseAddress = (address: Address) => {
    expect(address).to.be.an('object');
    expect(address.cityLocality).to.be.a('string');
    expect(address.postalCode).to.be.a('string');
    expect(address.street).to.be.an('array');
    expect(address.isResidential).to.be.a('boolean');
  };

  const assertOriginalAddress = (address: Address) => {
    expect(address).to.be.an('object');
    expect(address.cityLocality).to.be.a('string');
    expect(address.postalCode).to.be.a('string');
    expect(address.street).to.be.an('array');
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
      assertResponseAddress(response.normalized);
    });

    it('should have messages with the correct shape', () => {
      assertMessages(response.messages);
    });

    it('should return the original with the correct shape', () => {
      assertOriginalAddress(response.original);
    });
  });
});
