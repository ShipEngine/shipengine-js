import { Configuration, ShipmentsApi, TagsApi } from './generated/src/index';

const config = {
  API_KEY: 'abc123',
};
/* import { Client } from './client';
export const ShipEngine = (apiKey = 'foo') =>
  Client('https://api.shipengine.com', {
    headers: {
      Host: 'api.shipengine.com',
      'API-Key': apiKey,
    },
  });
 */

export class ShipEngineInternal {
  public tagsApi;
  public shipmentApi;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    const configuration = new Configuration({
      apiKey: config.API_KEY,
      // basePath: 'foo',
    });
    this.tagsApi = new TagsApi(configuration);
    this.shipmentApi = new ShipmentsApi(configuration);
  }
}
