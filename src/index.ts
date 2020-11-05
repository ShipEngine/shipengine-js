import {
  ShipEngineInternal,
  // ShipEngineInternalGenerated,
} from './services-internal/shipengine';

export class ShipEngine {
  private shipEngineInternal;
  constructor(apiKey: string) {
    // DI would be good heres
    this.shipEngineInternal = new ShipEngineInternal(apiKey);
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
