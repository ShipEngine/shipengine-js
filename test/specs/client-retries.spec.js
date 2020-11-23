const { ShipEngine } = require('../../cjs/index');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');

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

describe('retries', () => {
  it('should try again if 429 error', async () => {
    await Hoverfly.import('client/retry/429.json');
    const res = await api.createTag('foo');
    expect(res.name).to.eq('foo');
  });
});
