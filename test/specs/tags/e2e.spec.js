const ShipEngine = require('../../../cjs/shipengine').ShipEngine;
const { Hoverfly } = require('../../utils/Hoverfly');
const { expect } = require('chai');
const constants = require('../../utils/constants');

let shipengine;
describe('retries', () => {
  before(async () => {
    await Hoverfly.start();
    await Hoverfly.import('rpc/rpc.json');
    shipengine = new ShipEngine('MY_API_KEY', `${constants.hoverflyBaseUrl}`);
  });
  after(async () => {
    await Hoverfly.stop();
  });

  it('should work with createTag', async () => {
    const tags = await shipengine.createTag('foo');
    expect(tags.name).to.eq('foo');
  });
  it('should work with tags.create', async () => {
    const tags = await shipengine.tags.create({ name: 'foo' });
    expect(tags.name).to.eq('foo');
  });
});
