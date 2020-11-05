import { exec } from 'child_process';
process.env.BASE_URL = 'http://localhost:8500/v1';

import { ShipEngine } from '../src/index';
const api = new ShipEngine('foo');

describe('tags', () => {
  it('should create tag / return created tag', async () => {
    const res = await api.createTag('foo');
    expect(res.name).toBe('foo');
  });
});
