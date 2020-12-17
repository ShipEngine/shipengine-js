import { AxiosInstance } from 'axios';
import { createClient } from '../client';
import { ShipEngineAxiosClientConfig } from '../models/public/Config';

class InvalidArgumentError extends Error {}

/*
 * create a ShipEngine API Client instance
 */
export const ShipEngineApiClient = (
  axiosClientConfig: ShipEngineAxiosClientConfig
): AxiosInstance => {
  if (!axiosClientConfig.apiKey) {
    throw new InvalidArgumentError('Please enter API Key!');
  }
  const { baseURL, raxConfig } = axiosClientConfig.requestOptions || {};
  const finalBaseUrl = baseURL ?? 'https://api.shipengine.com/v1';
  const config = {
    raxConfig,
    baseURL: finalBaseUrl,
    headers: {
      ...(axiosClientConfig.requestOptions.headers || {}),
      'API-Key': axiosClientConfig.apiKey,
    },
  };
  const client = createClient(config);
  return client;
};
