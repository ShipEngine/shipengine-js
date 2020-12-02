// @ts-check
const { ShipEngine } = require('../../cjs/index');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');
const constants = require('../utils/contants');
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
      baseUrl: `${constants.hoverflyBaseUrl}/v1`,
    });
  });
  after(async () => {
    await Hoverfly.stop();
  });
  describe('hoverfly - tags', () => {
    before(async () => {
      await Hoverfly.import('v1/tags.json').then((result) => {
        console.log('import success:', result);
      });
    });
    it('should create tag / return created tag', async () => {
      const res = await api.createTag('foo');
      expect(res.name).to.eq('foo');
    });
    it('should have an api key', async () => {
      const res = await api.createTag('foo');
      expect(res.name).to.eq('foo');
    });
  });

  describe('addresses', () => {
    before(async () => {
      await Hoverfly.import('v1/addresses.json').then((result) => {
        console.log('import success:', result);
      });
    });
    it('should have no exceptions', async () => {
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
    it('should have exceptions if no matched address', async () => {
      const dodgersStadium = {
        street: ['1000 Elysion Ave'],
        country: 'US',
        cityLocality: 'Los Angeles',
        postalCode: '90012',
        stateProvince: 'CA',
      };
      const queryResult = await api.queryAddress(dodgersStadium);
      expect(queryResult.exceptions).not.to.be.empty;
      expect(queryResult.normalized).to.eq(undefined);
      expect(queryResult.original.country).to.eq(dodgersStadium.country);
    });
  });
});
