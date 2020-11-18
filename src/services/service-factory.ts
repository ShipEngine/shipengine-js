import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsService } from './tags';
import { AddressService } from './address';

class _ServiceFactory {
  public constructor(client: ShipEngineApiClient) {
    // simple multi-object inheritance strategy -- unfortunately, not type safe.
    const tags = new TagsService(client);
    Object.assign(this, tags.getAdvancedAPI(), tags.getConvenienceAPI());

    const address = new AddressService(client);
    Object.assign(this, address.getAdvancedAPI(), address.getConvenienceAPI());
  }
}

type InferPublicFields<T> = T extends {
  getAdvancedAPI: (...args: any[]) => infer AdvancedAPIFields;
  getConvenienceAPI: (...args: any[]) => infer ConvenienceAPIAPIFields;
}
  ? AdvancedAPIFields & ConvenienceAPIAPIFields
  : never;

type PublicFields = InferPublicFields<TagsService> &
  InferPublicFields<AddressService>;

// https://github.com/microsoft/TypeScript/issues/26792
export const ServiceFactory = _ServiceFactory as {
  new (client: any): _ServiceFactory & PublicFields;
};

// here is another way of doing the exact same thing without a service
export const createServices = (client: ShipEngineApiClient) => {
  const services = [TagsService, AddressService];
  const mapped = services.map((EachService) => {
    const f = new EachService(client);
    return {
      ...f.getAdvancedAPI(),
      ...f.getConvenienceAPI(),
    };
  });

  const result = Object.assign({}, ...mapped) as PublicFields;
  return result;
};
