import { AxiosInstance } from 'axios';
import { createClient } from '../models/shipengine-rest/client';
import { CustomAxiosClientConfig } from '../models/public/Config';
import { ShipEngineConfig } from '../shipengine';

class InvalidArgumentError extends Error {}

/*
 * create a ShipEngine API Client instance
 */
export const ShipEngineApiClient = (
  apiKey: string,
  config?: ShipEngineConfig
): AxiosInstance => {
  if (!apiKey) {
    throw new InvalidArgumentError('Please enter API Key!');
  }
  const { retryBackoffType, baseUrl } = config || {};
  const finalBaseUrl = baseUrl ?? 'https://api.shipengine.com/v1';

  const cfg: CustomAxiosClientConfig = {
    raxConfig: {
      statusCodesToRetry: [[429, 429]],
      // defaults to 'exponential backoff'
      ...(retryBackoffType ? { backoffType: retryBackoffType } : {}),
    },
    baseURL: finalBaseUrl,
    headers: {
      'API-Key': apiKey,
    },
  };
  const client = createClient(cfg);
  return client;
};
