import { AxiosConfig } from '../client';

export class ShipEngineApiServiceConfig {
  public apiKey: string;
  public requestOptions?: AxiosConfig;
  public constructor(
    apiKey: ShipEngineApiServiceConfig['apiKey'],
    requestOptions?: ShipEngineApiServiceConfig['requestOptions']
  ) {
    this.apiKey = apiKey;
    this.requestOptions = requestOptions;
  }
}
