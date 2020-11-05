import { Client } from './client';

export interface ShipEngineApi {
  getTags: () => Promise<any[]>;
}

export class ShipEngineInternal implements ShipEngineApi {
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
    const tags = await this.client('/tags');
    return tags;
  }
}

import { Configuration, TagsApi } from './generated/src/index';
export class ShipEngineInternalGenerated implements ShipEngineApi {
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
