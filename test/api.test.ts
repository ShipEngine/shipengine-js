import { ShipEngine } from '../src/index';
const api = new ShipEngine('foo');
describe('tags', () => {
  it('should get tags', async () => {
    const data = await api.getTagNames();
    console.log(data);
  });
});
