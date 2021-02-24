const { Hoverfly } = require('../../utils/Hoverfly');
const { expect } = require('chai');
const {
  InternalRpcClient,
} = require('../../../cjs/shared/models/shipengine-rpc/client');
const constants = require('../../utils/constants');

describe('RPC Client test', () => {
  before(async () => {
    await Hoverfly.start();
    await Hoverfly.import('rpc/rpc.json');
  });
  after(async () => {
    await Hoverfly.stop();
  });

  it('should return correct response if validation error', async () => {
    const client = new InternalRpcClient(
      'MY_API_KEY',
      constants.hoverflyBaseUrl
    );
    const response = await client.exec('test/error/invalid-request', {});
    expect(response.result).to.be.undefined;
    expect(response.type).to.eq('error');
    expect(response.error.message).to.eq('Invalid Request');
    expect(response.error.code).to.eq(-32600);
  });
});
