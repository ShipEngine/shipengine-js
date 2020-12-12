import { TagsService } from './tags';
import { AddressesService } from './addresses';
import { AxiosInstance } from 'axios';
import type { ShipEngineAPI } from '../models/public';

export const ServiceFactory = (client: AxiosInstance): ShipEngineAPI => {
  return {
    ...new TagsService(client),
    ...new AddressesService(client),
  };
};
