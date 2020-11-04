import { Configuration, ShipmentsApi, TagsApi } from './generated/src/index';

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
    const configuration = new Configuration({
      apiKey: apiKey,
      // basePath: 'foo',
    });
    this.tagsApi = new TagsApi(configuration);
    this.shipmentApi = new ShipmentsApi(configuration);
  }
}
