import { ShipEngineApiServiceConfig } from './models/Config';
import { ServiceFactory } from './services/service-factory';
import { ShipEngineApi } from './services/shipengine-api-factory';

// should this api key be optional here in case of users who want to _only_ use api keys on a request by request basis?

type ApiKey = string;

type SimplifiedConfig = {
  apiKey: ApiKey;
  baseUrl?: string;
};

type ShipEngineConfig = ApiKey | SimplifiedConfig;

const mapToApiServiceConfig = (
  config: ShipEngineConfig
): ShipEngineApiServiceConfig => {
  if (typeof config === 'string') {
    return { apiKey: config };
  }

  return { apiKey: config.apiKey, requestOptions: { baseURL: config.baseUrl } };
};

export const ShipEngine = (config: ShipEngineConfig) => {
  return ServiceFactory(ShipEngineApi(mapToApiServiceConfig(config)));
};
