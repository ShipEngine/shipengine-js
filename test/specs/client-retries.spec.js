const {
  ShipEngineApiClient,
} = require('../../cjs/services/shipengine-api-factory');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');
const constants = require('../utils/constants');

describe('retries', () => {
  const get = async () =>
    ShipEngineApiClient('123', {
      baseUrl: constants.hoverflyBaseUrl,
    }).get('/retries');

  before(async () => {
    await Hoverfly.start();
  });
  after(async () => {
    await Hoverfly.stop();
  });

  it('should try again if 429 error', async () => {
    await Hoverfly.import('client/retry/429.json');
    const { status } = await get();
    expect(status).to.eq(200);
  });
  it('should try again if 500 error', async () => {
    await Hoverfly.import('client/retry/500.json');
    const { status } = await get();
    expect(status).to.eq(200);
  });
  it('should not try again if 404 error', async () => {
    await Hoverfly.import('client/retry/404.json');
    try {
      await get();
      expect(false).to.be.true; // should throw error
    } catch (err) {
      expect(err.response.status).to.eq(404);
      expect(err).to.be.ok;
    }
  });
});
