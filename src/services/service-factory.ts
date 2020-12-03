import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsServiceAPI, createTagsConvenienceService } from './tags';
import {
  AddressesServiceAPI,
  createAddressesConvenienceService,
} from './address';

// utility type

// here is another way of doing the exact same thing without a service

export type ServiceAPI = TagsServiceAPI & AddressesServiceAPI;

export const ServiceFactory = (client: ShipEngineApiClient): ServiceAPI => {
  const services = [
    createTagsConvenienceService,
    createAddressesConvenienceService,
  ];

  const publicServices = services.reduce((acc, s) => {
    const service = s(client);
    return {
      ...acc,
      ...service,
    };
  }, {} as ServiceAPI);

  return publicServices;
};
