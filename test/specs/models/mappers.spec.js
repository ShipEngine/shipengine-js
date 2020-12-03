const { expect } = require('chai');
const forEach = require('mocha-each');
const {
  mapToNormalizedAddress,
} = require('../../../cjs/models/mappers/address');

/**
 * @typedef { import('../../../src/services/service-factory').ServiceAPI } ServiceAPI
 */
const fixtures = {
  address: {
    address_line1: 'abc',
    address_line2: '123',
    address_line3: '456',
  },
};

describe('mapToNormalizedAddress', () => {
  describe('street_line should convert to string[]', () => {
    forEach([
      [
        {
          address_line1: 'abc',
          address_line2: '123',
          address_line3: '456',
        },
        ['abc', '123', '456'],
      ],
      [
        {
          address_line1: 'abc',
          address_line2: '123',
          address_line3: undefined,
        },
        ['abc', '123'],
      ],
    ]).it('%j -> %j', (arg, expected) => {
      expect(
        mapToNormalizedAddress({ ...fixtures.address, ...arg }).street
      ).to.eql(expected);
    });
  });

  describe('residential indicators should convert to bool?', () => {
    forEach([
      ['yes', true],
      ['no', false],
      ['unknown', undefined],
    ]).it('%s -> %s', (arg, expected) => {
      expect(
        mapToNormalizedAddress({
          ...fixtures.address,
          address_residential_indicator: arg,
        }).residential
      ).to.eql(expected);
    });
  });
});

describe('mapToAddressQueryResult', () => {});
describe('mapToRequestBodyAddress', () => {});
describe('mapToShipEngineExceptions', () => {});
