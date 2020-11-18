import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsService } from './tags';
import { AddressService } from './address';

type GetPublicAPI<T> = T extends {
  getAdvancedAPI: (...args: any[]) => infer AdvancedAPIFields;
  getConvenienceAPI: (...args: any[]) => infer ConvenienceAPIAPIFields;
}
  ? AdvancedAPIFields & ConvenienceAPIAPIFields
  : never;

type PublicServiceAPI = GetPublicAPI<TagsService> &
  GetPublicAPI<AddressService>;

// here is another way of doing the exact same thing without a service
export const ServiceFactory = (client: ShipEngineApiClient) => {
  const services = [TagsService, AddressService];

  const publicServices = services.reduce((acc, EachService) => {
    const service = new EachService(client);
    return {
      ...acc,
      ...service.getAdvancedAPI(),
      ...service.getConvenienceAPI(),
    };
  }, {} as PublicServiceAPI);

  return publicServices;
};
