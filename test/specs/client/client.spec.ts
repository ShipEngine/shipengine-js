import { Hoverfly } from '../../utils/Hoverfly';
import { expect } from 'chai';
import constants from '../../utils/constants';
import { InternalRpcClient } from '../../../cjs/shared/models/client/client';

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
    const response = await client.exec(
      'test/error/invalid-request',
      {},
      (v) => v
    );
    expect('result' in response).to.be.false;
    if (response.type !== 'error') {
      throw Error('should be error');
    }
    expect(response.error.message).to.eq('Invalid Request');
    expect(response.error.code).to.eq(-32600);
  });
});
