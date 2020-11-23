const { ShipEngine } = require('../../cjs/index');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');
describe('My API', () => {
  let api;
  describe('hoverfly - tags', () => {
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
    it('should create tag / return created tag', async () => {
      await Hoverfly.import('tags.json');
      const res = await api.createTag('foo');
      expect(res.name).to.eq('foo');
    });
    it('should have an api key', async () => {
      await Hoverfly.import('tags.json');
      const res = await api.createTag('foo');
      expect(res.name).to.eq('foo');
    });
  });
});
