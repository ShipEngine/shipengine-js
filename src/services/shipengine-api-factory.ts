import { AxiosInstance } from 'axios';
import { createClient } from '../client';
import { ShipEngineApiClientConfig } from '../models/public/Config';

class InvalidArgumentError extends Error {}

/*
 * create a ShipEngine API Client instance
 */
export const ShipEngineApiClient = (
  baseConfig: ShipEngineApiClientConfig
): AxiosInstance => {
  if (!baseConfig.apiKey) {
    throw new InvalidArgumentError('Please enter API Key!');
  }
  const { baseURL, raxConfig } = baseConfig.requestOptions || {};
  const finalBaseUrl = baseURL ?? 'https://api.shipengine.com/v1';
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
