import {
  ShipEngineInternal,
  // ShipEngineInternalGenerated,
} from './services-internal/shipengine';

export class ShipEngine {
  private shipEngineInternal;
  constructor(apiKey: string, overrides?: RequestInit) {
    // DI would be good heres
    this.shipEngineInternal = new ShipEngineInternal(apiKey, overrides);
  }
  public async getTagNames(): Promise<string[]> {
    const tags = await this.shipEngineInternal.getTags();
    if (!tags) return [];
    return tags?.map((el: any) => el.tagName);
  }
  public async createTag(tagName: string): Promise<any> {
    const response = await this.shipEngineInternal.createTag(tagName);
    return response;
  }
}
