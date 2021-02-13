import { ShipEngineRpcApi } from '../../shared/models/shipengine-rpc/shipengine-rpc-api';

export class CreateTagQuery {
  constructor(public name: string) {}
}
export class CreateTagQueryResult {
  constructor(public name: string) {}
}
export class TagsRepository {
  #api: ShipEngineRpcApi;
  public constructor(api: ShipEngineRpcApi) {
    this.#api = api;
  }

  public create = async (
    params: CreateTagQuery
  ): Promise<CreateTagQueryResult> => {
    const { result } = (await this.#api.createTag(params)) || {};
    if (!result?.name) throw Error('No data found'); // could be either?
    return new CreateTagQueryResult(params.name);
  };
}
