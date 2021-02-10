import { InternalRpcClient } from './client';
interface CreateTagsRequest {
  name: string;
}

interface CreateTagsResponse {
  name: string;
}

export class ShipEngineRpcApi {
  constructor(private client: InternalRpcClient) {}

  /* node_modules/shipengine-json-schema/index.json */
  createTag = async (tag: string) => {
    return this.client.exec<CreateTagsRequest, CreateTagsResponse>(
      'create_tag',
      {
        name: tag,
      }
    );
  };
}

const test = async () => {
  const shipEngineRpcApi = new ShipEngineRpcApi(
    new InternalRpcClient('MY_API_KEY', 'http://localhost:8500')
  );
  const result = await shipEngineRpcApi.createTag('abc');
  console.log(result);
};
