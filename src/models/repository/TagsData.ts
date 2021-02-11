import { ShipEngineRpcApi } from '../shipengine-rpc/shipengine-rpc-api';

type CreateTagResult = {
  name: string;
};
/** Is this needed? */
export class TagsData {
  #api: ShipEngineRpcApi;
  constructor(api: ShipEngineRpcApi) {
    this.#api = api;
  }

  /**
   * this sort of decouples the data model from the implementation (e.g. RPC, HTTP, etc)
   * create could be "swapped out" for another data model
   */
  public createTag = async (name: string): Promise<CreateTagResult> => {
    const { result } = await this.#api.createTag({ name });
    if (!result?.name) throw Error('TODO'); // could be either?
    return {
      name: result.name,
    };
  };
}
