import { ShipEngineApiClientConfig, ShipEngineConfig } from '../public';

export const mapToApiServiceConfig = (
  config: ShipEngineConfig
): ShipEngineApiClientConfig => {
  if (typeof config === 'string') {
    return { apiKey: config };
  }

  return {
    apiKey: config.apiKey,
    requestOptions: {
      baseURL: config.baseUrl,
      raxConfig: {
        backoffType: config.retryBackoffType,
      },
    },
  };
};
