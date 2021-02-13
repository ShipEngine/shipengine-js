import { ShipEngineRpcApi } from '../../shared/models/shipengine-rpc/shipengine-rpc-api';

export class CreateTagQuery {
  constructor(public name: string) {}
}
export class CreateTagQueryResult {
  constructor(public name: string) {}
}
/** Is this needed? */
export class TagsRepository {
  #api: ShipEngineRpcApi;
  public constructor(api: ShipEngineRpcApi) {
    this.#api = api;
  }

  /**
   * this sort of decouples the data model from the implementation (e.g. RPC, HTTP, etc)
   * createTag could be "swapped out" for another data model, as long as it returned "CreateTagQueryResult"
   */
  public create = async (
    params: CreateTagQuery
  ): Promise<CreateTagQueryResult> => {
    const { result } = (await this.#api.createTag(params)) || {};
    if (!result?.name) throw Error('No data found'); // could be either?
    return new CreateTagQueryResult(params.name);
  };
}
