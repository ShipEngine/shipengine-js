import { TagsService } from './tags';
import { AddressesService } from './address';
import { AxiosInstance } from 'axios';
import type { ShipEngineAPI } from '../models/public';

// here is another way of doing the exact same thing without a service
export const ServiceFactory = (client: AxiosInstance): ShipEngineAPI => {
  return {
    ...new TagsService(client),
    ...new AddressesService(client),
  };
};
