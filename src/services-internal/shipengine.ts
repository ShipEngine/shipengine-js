import { Client } from './client';

export interface ShipEngineApi {
  getTags: () => Promise<any[]>;
}

export class ShipEngineInternal implements ShipEngineApi {
  private client;
  constructor(apiKey: string, clientOpts: RequestInit = {}) {
    const baseUrl = process?.env?.BASE_URL ?? 'https://api.shipengine.com/v1';
    const client = Client(baseUrl, {
      ...clientOpts,
      headers: {
        'API-Key': apiKey,
        ...clientOpts.headers,
      },
    });
    this.client = client;
  }
  public async getTags(): Promise<any[]> {
    const tags = await this.client('/tags');
    return tags;
  }
  public async createTag(tagName: string): Promise<any> {
    const tags = await this.client(`/tags/${tagName}`, {
      method: 'POST',
      data: {}, // failed to catch a bug
    });
    return tags;
  }
}

// import { Configuration, TagsApi } from './generated/src/index';
/* export class ShipEngineInternalGenerated implements ShipEngineApi {
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
 */
