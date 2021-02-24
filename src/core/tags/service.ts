import { bimap, identity } from '../../shared/models/shipengine-rpc/either';
import { ShipEngineRpcApiClient } from '../../shared/models/shipengine-rpc/shipengine-rpc-api';
import { CreateTagParams } from '../../shared/models/shipengine-rpc/types';

export class TagsAdvanced {
  #api: ShipEngineRpcApiClient;
  public constructor(api: ShipEngineRpcApiClient) {
    this.#api = api;
  }

  public create = async (params: CreateTagParams) => {
    return this.#api.createTag(params);
  };
}

export class TagsService {
  tags: TagsAdvanced;
  constructor(api: ShipEngineRpcApiClient) {
    this.tags = new TagsAdvanced(api);
  }

  public createTag = async (q: string) => {
    const data = await this.tags.create({ name: q });
    return bimap(data, (result) => result.name, identity);
  };
}
