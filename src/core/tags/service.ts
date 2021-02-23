import { ShipEngineRpcApiClient } from '../../shared/models/shipengine-rpc/shipengine-rpc-api';
import {
  isJsonRpcError,
  JsonRpcError,
} from '../../shared/models/shipengine-rpc/client';
import {
  CreateTagParams,
  CreateTagResult,
} from '../../shared/models/shipengine-rpc/types';

export class TagsAdvanced {
  #api: ShipEngineRpcApiClient;
  public constructor(api: ShipEngineRpcApiClient) {
    this.#api = api;
  }

  public create = async (
    params: CreateTagParams
  ): Promise<CreateTagResult | JsonRpcError> => {
    return this.#api.createTag(params);
  };
}

export class TagsService {
  tags: TagsAdvanced;
  constructor(api: ShipEngineRpcApiClient) {
    this.tags = new TagsAdvanced(api);
  }

  public createTag = async (q: string): Promise<string | JsonRpcError> => {
    const data = await this.tags.create({ name: q });
    if (isJsonRpcError(data)) {
      return data;
    }
    return data.name;
  };
}
