const { ShipEngine, ShipEngineError } = require('../../../cjs/index');
const { Hoverfly } = require('../../utils/Hoverfly');
const { expect } = require('chai');
const constants = require('../../utils/constants');
const suppressLogs = require('mocha-suppress-logs');
/**
 * @typedef { import('../../../src/models/public').ShipEngineAPI } ShipEngineAPI
 */

describe('tracking service', () => {
  suppressLogs();
  /** @type { ShipEngineAPI } **/
  let api;
  beforeEach(async () => {
    await Hoverfly.start();
    await Hoverfly.import('v1/tracking.json');
    api = new ShipEngine('myApiKey', {
      baseUrl: `${constants.hoverflyBaseUrl}/v1`,
    });
  });
  describe('query', () => {
    after(async () => {
      await Hoverfly.stop();
    });
    describe('by code/tracking num', () => {
      it('should handle success', async () => {
        const queryResult = await api.tracking.query({
          carrierCode: 'query',
          trackingNumber: 'foobar',
        });
        expect(queryResult.warnings).to.be.empty;
        expect(queryResult.errors).to.be.empty;
        expect(queryResult.info.length).to.eq(3);
      });
      it('should return errors, but not throw errors', async () => {
        const queryResult = await api.tracking.query({
          carrierCode: 'foobar',
          trackingNumber: 'foobar',
        });
        expect(queryResult.information).to.be.undefined;
        expect(queryResult.errors).not.to.be.empty;
      });
    });
    describe('by package id', () => {
      it('should handle success', async () => {
        const queryResult = await api.tracking.query('label');
        expect(queryResult.information.events).not.to.be.empty;
        expect(queryResult.errors).to.be.empty;
      });
      it('should not throw errors', async () => {
        const queryResult = await api.tracking.query('errors');
        expect(queryResult.information).to.be.undefined;
        expect(queryResult.errors).not.to.be.empty;
      });
    });
  });
  describe('trackShipment', () => {
    it('should handle success', async () => {
      try {
        const queryResult = await api.trackShipment({
          carrierCode: 'query',
          trackingNumber: 'foobar',
        });
        expect(queryResult.events).not.to.be.undefined;
      } catch (err) {
        console.error(err);
        expect.fail();
      }
    });
    it('should throw errors', async () => {
      try {
        const queryResult = await api.trackShipment('errors');
        expect.fail(queryResult);
      } catch (err) {
        expect(err).to.be.instanceOf(ShipEngineError);
      }
    });
  });
});
