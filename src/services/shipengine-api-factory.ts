import { createClient } from '../client';
import { ShipEngineApiServiceConfig } from '../models/Config';

class InvalidArgumentError extends Error {}

/*
 * create a ShipEngine API Client instance
 */
export const ShipEngineApi = (baseConfig: ShipEngineApiServiceConfig) => {
  if (!baseConfig.apiKey) {
    throw new InvalidArgumentError('Please enter API Key!');
  }
  const finalBaseUrl =
    baseConfig.requestOptions?.baseURL ?? 'https://api.shipengine.com/v1';
  // I can override the api key when instantiating the ship engine api, but also on a request by request basis.
  const client = createClient({
    ...baseConfig,
    baseURL: finalBaseUrl,
    headers: {
      ...baseConfig.requestOptions?.headers,
      'API-Key': baseConfig.apiKey,
    },
  });
  return client;
};

export type ShipEngineApiClient = ReturnType<typeof createClient>;
