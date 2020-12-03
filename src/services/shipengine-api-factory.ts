import { createClient } from '../client';
import { ShipEngineApiServiceConfig } from '../models/Config';

class InvalidArgumentError extends Error {}

/*
 * create a ShipEngine API Client instance
 */
export const ShipEngineApiClient = (baseConfig: ShipEngineApiServiceConfig) => {
  if (!baseConfig.apiKey) {
    throw new InvalidArgumentError('Please enter API Key!');
  }
  const { baseURL, raxConfig } = baseConfig.requestOptions || {};
  const finalBaseUrl = baseURL ?? 'https://api.shipengine.com/v1';
  // I can override the api key when instantiating the ship engine api, but also on a request by request basis.
  const config = {
    raxConfig,
    baseURL: finalBaseUrl,
    headers: {
      ...(baseConfig.requestOptions?.headers || {}),
      'API-Key': baseConfig.apiKey,
    },
  };
  const client = createClient(config);
  return client;
};

export type ShipEngineApiClient = ReturnType<typeof createClient>;
