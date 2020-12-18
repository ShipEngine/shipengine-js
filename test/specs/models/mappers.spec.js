// @ts-check
const { expect } = require('chai');
const forEach = require('mocha-each');
const {
  mapToRequestBodyAddress,
  mapToNormalizedAddress,
  mapToAddressQueryResult,
} = require('../../../cjs/models/mappers/address');
const { ShipEngineExceptionType } = require('../../../cjs/models/public');

/**
 * @typedef { import('../../../src/services/service-factory').ServiceAPI } ServiceAPI
 */
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
      expect(mapToNormalizedAddress(arg).street).to.eql(expected);
    });
  });

  describe('residential indicators should convert to bool?', () => {
    forEach([
      ['yes', true],
      ['no', false],
      ['unknown', false],
    ]).it('%s -> %s', (arg, expected) => {
      expect(
        mapToNormalizedAddress({
          address_line1: 'abc',
          address_residential_indicator: arg,
        }).isResidential
      ).to.eql(expected);
    });
  });
});

describe('mapToRequestBodyAddress', () => {
  describe('street should convert to address line', () => {
    const street1 = [
      {
        street: 'abc',
      },
      {
        address_line1: 'abc',
        address_line2: undefined,
        address_line3: undefined,
      },
    ];
    const street2 = [
      {
        street: ['abc'],
      },
      {
        address_line1: 'abc',
        address_line2: undefined,
        address_line3: undefined,
      },
    ];
    const countryCode1 = [
      {
        country: null,
      },
      {
        country_code: 'US',
      },
    ];
    const countryCode2 = [
      {
        country: 'CZ',
      },
      {
        country_code: 'CZ',
      },
    ];
    forEach([street1, street2, countryCode1, countryCode2]).it(
      '%j -> %j',
      (arg, expected) => {
        expect(mapToRequestBodyAddress(arg)).to.contain(expected);
      }
    );
  });
});

describe('mapToAddressQueryResult', () => {
  describe('normalized', () => {
    it('should be empty if no matched address', () => {
      const addressQuery = mapToAddressQueryResult({
        matched_address: null,
        original_address: {},
        messages: [],
      });
      expect(addressQuery.normalized).to.be.undefined;
    });
  });
  describe('warning / error / info - exceptions', () => {
    it('should have keys that are filtered by exceptions', () => {
      const addressQuery = mapToAddressQueryResult({
        matched_address: {},
        original_address: {},
        messages: [
          {
            type: 'warning',
          },
          {
            type: 'error',
          },
          {
            type: 'info',
          },
        ],
      });

      expect(addressQuery.info[0].type).to.eq('info');

      expect(addressQuery.warnings[0].type).to.eq('warning');

      expect(addressQuery.errors[0].type).to.eq('error');

      expect(addressQuery.warnings.length).to.eq(1);
      expect(addressQuery.info.length).to.eq(1);
      expect(addressQuery.errors.length).to.eq(1);
    });
  });
});
