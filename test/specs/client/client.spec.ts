import { Hoverfly } from '../../utils/Hoverfly';
import { expect } from 'chai';
import constants from '../../utils/constants';
import { InternalRpcClient } from '../../../src/shared/models/client/client';

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

    response.ifLeft((r) => {
      expect(r.message).to.eq('Invalid Request');
      expect(r.code).to.eq(-32600);
    });
    response.ifRight(() => {
      expect.fail('should fail.');
    });
  });
});
