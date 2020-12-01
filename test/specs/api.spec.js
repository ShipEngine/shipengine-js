// @ts-check
const { ShipEngine } = require('../../cjs/index');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');

/**
 * @typedef { import('../../src/services/service-factory').ServiceAPI } ServiceAPI
 */

describe('API', () => {
  /** @type { ServiceAPI } **/
  let api;
  before(async () => {
    await Hoverfly.start();
    api = ShipEngine({
      apiKey: 'myApiKey',
      baseUrl: 'http://localhost:8500/v1',
    });
  });
  after(async () => {
    await Hoverfly.stop();
  });

  describe('hoverfly - tags', () => {
    it('should create tag / return created tag', async () => {
      await Hoverfly.import('v1/tags.json');
      const res = await api.createTag('foo');
      expect(res.name).to.eq('foo');
    });
    it('should have an api key', async () => {
      await Hoverfly.import('v1/tags.json');
      const res = await api.createTag('foo');
      expect(res.name).to.eq('foo');
    });
  });

  describe('addresses', () => {
    it('should contain no addresses', async () => {
      await Hoverfly.import('v1/addresses.json');
      const yankeeStadium = {
        street: ['1 E 161 St'],
        country: 'US',
        cityLocality: 'The Bronx',
        postalCode: '10451',
        stateProvince: 'NY',
      };
      const queryResult = await api.queryAddress(yankeeStadium);
      expect(queryResult.exceptions).to.be.empty;
      expect(queryResult.normalized.country).not.to.be.empty;
      expect(queryResult.original.country).not.to.be.empty;
    });
  });
});
