import { expect } from 'chai';
import constants from '../../utils/constants';
import { InternalRpcClient } from '../../../src/shared/models/client/client';

describe('RPC Client test', () => {
  it('should return correct response if validation error!', async () => {
    const client = new InternalRpcClient(
      'MY_API_KEY',
      constants.isomorphicBaseUri
    );
    const response = await client.exec('test/error/invalid-request', {} as any);

    response.onError((r) => {
      expect(r.message).to.eq('Invalid Request');
      expect(r.code).to.eq(-32600);
    });
    response.onSuccess(() => {
      expect.fail('should fail.');
    });
  });
});
