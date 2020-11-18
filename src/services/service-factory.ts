import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsService } from './tags';

class _ServiceFactory {
  public constructor(client: ShipEngineApiClient) {
    // simple multi-object inheritance strategy -- unfortunately, not type safe.
    const tags = new TagsService(client);
    Object.assign(this, tags.getAdvancedAPI(), tags.getConvenienceAPI());
  }
}
type InferPublicFields<T> = T extends {
  getAdvancedAPI: (...args: any[]) => infer AdvancedAPIFields;
  getConvenienceAPI: (...args: any[]) => infer ConvenienceAPIAPIFields;
}
  ? AdvancedAPIFields & ConvenienceAPIAPIFields
  : never;

// https://github.com/microsoft/TypeScript/issues/26792
export const ServiceFactory = _ServiceFactory as {
  new (client: any): _ServiceFactory & InferPublicFields<TagsService>;
};
