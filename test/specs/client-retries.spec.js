const { ShipEngine } = require('../../cjs/index');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');

describe.only('retries', () => {
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

  it('should try again if 429 error', async () => {
    await Hoverfly.import('client/retry/429.json');
    const res = await api.createTag('foo');
    expect(res.name).to.eq('foo');
  });
  it('should try again if 500 error', async () => {
    await Hoverfly.import('client/retry/500.json');
    const res = await api.createTag('foo');
    expect(res.name).to.eq('foo');
  });
  it('should not try again if 404 error', async () => {
    await Hoverfly.import('client/retry/404.json');
    try {
      await api.createTag('foo');
      expect(false).to.be.true; // should throw error
    } catch (err) {
      expect(err.response.status).to.eq(404);
      expect(err).to.be.ok;
    }
  });
});
