const ShipEngine = require('../../../cjs/shipengine').ShipEngine;
const { Hoverfly } = require('../../utils/Hoverfly');
const { expect } = require('chai');
const constants = require('../../utils/constants');

let shipengine;
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
    expect(response.result).to.eq('foo');
  });
  it('should work with tags.create', async () => {
    const response = await shipengine.tags.create({ name: 'foo' });
    expect(response.result.name).to.eq('foo');
  });
});
