const { ShipEngine } = require('../../cjs/index');
const { Hoverfly } = require('../utils/Hoverfly');
const { expect } = require('chai');
describe('My API', () => {
  let api;
  describe('hoverfly - tags', () => {
    before(async () => {
      await Hoverfly.start();
      process.env.BASE_URL = 'http://localhost:8500/v1';
      api = new ShipEngine('myApiKey');
    });
    after(async () => {
      await Hoverfly.stop();
    });
    it('should create tag / return created tag', async () => {
      await Hoverfly.import('tags.json');
      const res = await api.createTag('foo');
      expect(res.name).to.be('foo');
    });
  });
});
