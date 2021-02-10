import { InternalRpcClient } from './client';
import { AddressCall, AddressReply, TagCall, TagReply } from './types';
export class ShipEngineRpcApi {
  constructor(private client: InternalRpcClient) {}

  /* node_modules/shipengine-json-schema/index.json */
  createTag = async (tag: TagCall) =>
    this.client.exec<TagCall, TagReply>('create_tag', tag);

  validateAddress = async (address: AddressCall) =>
    this.client.exec<AddressCall, AddressReply>('validate_address', address);
}

const test = async () => {
  const shipEngineRpcApi = new ShipEngineRpcApi(
    new InternalRpcClient('MY_API_KEY', 'http://localhost:8500')
  );
  const result = await shipEngineRpcApi.createTag({ name: 'abc' });
  console.log(result);
};
