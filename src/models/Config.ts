import { AxiosConfig } from '../client';
import { Compute } from '../utils/ts';

type RequestOptions = Compute<
  Pick<AxiosConfig, 'baseURL' | 'headers' | 'raxConfig'>
>;

export class ShipEngineApiServiceConfig {
  public apiKey: string;
  public requestOptions?: RequestOptions;
  public constructor(
    apiKey: ShipEngineApiServiceConfig['apiKey'],
    requestOptions?: RequestOptions
  ) {
    this.apiKey = apiKey;
    this.requestOptions = requestOptions;
  }
}
