import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsServiceAPI, createTagsServiceAPI } from './tags';

// here is another way of doing the exact same thing without a service
type ServiceAPI = TagsServiceAPI;
export const ServiceFactory = (client: ShipEngineApiClient): ServiceAPI => {
  const services = [createTagsServiceAPI];

  const publicServices = services.reduce((acc, s) => {
    const service = s(client);
    return {
      ...acc,
      ...service,
    };
  }, {} as ServiceAPI);

  return publicServices;
};
