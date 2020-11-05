import { Client } from './client';
export class ShipEngineInternal {
  private client;
  constructor(apiKey: string) {
    const client = Client('https://api.shipengine.com/v1', {
      headers: {
        'API-Key': apiKey,
      },
    });
    this.client = client;
  }
  public async getTags(): Promise<any[]> {
    const data = await this.client('/tags');
    return data;
  }
}

import { Configuration, ShipmentsApi, TagsApi } from './generated/src/index';
export class ShipEngineInternalGenerated {
  private tagsApi;
  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
      // basePath: 'foo',
    });
    this.tagsApi = new TagsApi(configuration);
  }
  public async getTags(): Promise<any[]> {
    const data = await this.tagsApi.listTags();
    if (!data || !data.tags) return [];
    return data.tags;
  }
}
