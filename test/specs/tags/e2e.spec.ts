import { ShipEngine } from '../../../cjs/shipengine';
import { Hoverfly } from '../../utils/Hoverfly';
import { expect } from 'chai';
import constants from '../../utils/constants';

let shipengine: ShipEngine;
describe('Create tag', () => {
  before(async () => {
    await Hoverfly.start();
    await Hoverfly.import('rpc/rpc.json');
    shipengine = new ShipEngine('MY_API_KEY', `${constants.hoverflyBaseUrl}`);
  });
  after(async () => {
    await Hoverfly.stop();
  });

  it('should work with createTag', async () => {
    const response = await shipengine.createTag('foo');
    expect(response).to.eq('foo');
  });
  it('should work with tags.create', async () => {
    const response = await shipengine.tags.create({ name: 'foo' });
    expect(response.name).to.eq('foo');
  });
});
