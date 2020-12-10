import { TagsServiceAPI } from './tags';
import { AddressesServiceAPI } from './address';
import { AxiosInstance } from 'axios';
import type { ShipEngine } from '../models/public';

// here is another way of doing the exact same thing without a service
export const ServiceFactory = (client: AxiosInstance): ShipEngine => {
  return {
    ...new TagsServiceAPI(client),
    ...new AddressesServiceAPI(client),
  };
};
