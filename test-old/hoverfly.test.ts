import { ShipEngine } from '../src/index';
import { Hoverfly } from './Hoverfly';

describe('My API', () => {
  let api: ShipEngine;
  describe('hoverfly - tags', () => {
    beforeAll(async () => {
      await Hoverfly.start();
      process.env.BASE_URL = 'http://localhost:8500/v1';
      api = new ShipEngine('myApiKey');
    });
    afterAll(async () => {
      await Hoverfly.stop();
    });
    it('should create tag / return created tag', async () => {
      await Hoverfly.import('tags.json');
      const res = await api.createTag('foo');
      expect(res.name).toBe('foo');
    });
  });
});
