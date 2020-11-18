import { ServiceFactory } from './services/service-factory';
import { ShipEngineApi } from './services/shipengine-api-factory';

// should this api key be optional here in case of users who want to _only_ use api keys on a request by request basis?
export const ShipEngine = (apiKey: string) =>
  new ServiceFactory(ShipEngineApi({ apiKey }));
