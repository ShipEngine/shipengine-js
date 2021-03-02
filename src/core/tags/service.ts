import { ShipEngineRpcApiClient } from '../../shared/models/shipengine-rpc/shipengine-rpc-api';
import { CreateTagParams } from '../../shared/models/shipengine-rpc/types';
import { toThrowable } from '../../utils';
export class TagsAdvanced {
  #api: ShipEngineRpcApiClient;
  public constructor(api: ShipEngineRpcApiClient) {
    this.#api = api;
  }

  public create = async (params: CreateTagParams) => {
    const result = await this.#api.createTag(params);
    return toThrowable(result);
  };
}

export class TagsService {
  tags: TagsAdvanced;
  public constructor(api: ShipEngineRpcApiClient) {
    this.tags = new TagsAdvanced(api);
  }

  public createTag = async (q: string) => {
    const data = await this.tags.create({ name: q });
    return data.name;
  };
}
