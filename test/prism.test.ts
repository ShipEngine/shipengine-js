import { ShipEngine } from '../src';
import { Prism } from './Prism';

describe('prism - tags', () => {
  let api: ShipEngine;
  beforeAll(async () => {
    process.env.BASE_URL = 'http://127.0.0.1:4010/v1';
    api = new ShipEngine('myApiKey');
    await Prism.start();
    console.log('prism started!');
  });
  afterAll(async () => {
    await Prism.stop();
    console.log('done!');
  });
  it('should create tag / return created tag', async () => {
    const res = await api.createTag('foo');

    expect(res.name).toBe('Fragile');
  });
});
