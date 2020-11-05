import { ShipEngineInternal } from './services-internal/shipengine';

export class ShipEngine {
  private shipEngineInternal;
  constructor(apiKey: string) {
    this.shipEngineInternal = new ShipEngineInternal(apiKey);
  }
  public async getTagNames(): Promise<string[]> {
    const tags = await this.shipEngineInternal.getTags();
    if (!tags) return [];
    return tags?.map((el: any) => el.tagName);
  }
}
