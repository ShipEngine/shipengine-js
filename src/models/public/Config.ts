import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RetryConfig } from 'retry-axios';
import { Compute } from '../../utils/ts';

export type AxiosConfig = AxiosRequestConfig &
  RetryConfig & { apiKey?: string };

export type Config = AxiosConfig | AxiosInstance;

type RequestOptions = Compute<
  Pick<AxiosConfig, 'baseURL' | 'headers' | 'raxConfig'>
>;

export class ShipEngineApiClientConfig {
  public apiKey: string;
  public requestOptions?: RequestOptions;
  public constructor(
    apiKey: ShipEngineApiClientConfig['apiKey'],
    requestOptions?: RequestOptions
  ) {
    this.apiKey = apiKey;
    this.requestOptions = requestOptions;
  }
}

// should this api key be optional here in case of users who want to _only_ use api keys on a request by request basis?

/**
 * api key
 */

type ApiKey = string;
type AdvancedConfig = {
  apiKey: ApiKey;
  baseUrl?: string;
  retryBackoffType?: 'linear' | 'static' | 'exponential';
};

export type ShipEngineConfig = ApiKey | AdvancedConfig;
