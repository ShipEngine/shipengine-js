import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RetryConfig } from 'retry-axios';
import { Compute } from '../../utils/ts';

export type AxiosConfig = AxiosRequestConfig &
  RetryConfig & { apiKey?: string };

export type Config = AxiosConfig | AxiosInstance;

type RequestOptions = Compute<
  Pick<AxiosConfig, 'baseURL' | 'headers' | 'raxConfig'>
>;

export type RetryBackOffType = 'linear' | 'static' | 'exponential';

export class ShipEngineAxiosClientConfig {
  public apiKey: string;
  public requestOptions: RequestOptions;
  public constructor(
    apiKey: string,
    baseUrl?: string,
    retryBackOffType?: RetryBackOffType
  ) {
    this.apiKey = apiKey;
    this.requestOptions = {
      baseURL: baseUrl,
      raxConfig: {
        backoffType: retryBackOffType,
      },
    };
  }
}
