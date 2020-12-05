import { AxiosConfig } from '../../client';
import { Compute } from '../../utils/ts';

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
