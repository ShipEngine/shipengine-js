import { AddressesService } from './addresses';
import { TrackingService } from './tracking';
import { AxiosInstance } from 'axios';
import type { ShipEngineAPI } from '../models/public';

export const ServiceFactory = (client: AxiosInstance): ShipEngineAPI => {
  return {
    ...new TrackingService(client),
    ...new AddressesService(client),
  };
};
