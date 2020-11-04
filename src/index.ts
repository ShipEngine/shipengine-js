import { ShipEngineInternal } from './services-internal/shipengine';

export class ShipEngine {
  private shipEngineInternal;
  constructor(apiKey: string) {
    this.shipEngineInternal = new ShipEngineInternal(apiKey);
  }
  public async createTagsAndGetTags(tagName: string) {
    await this.shipEngineInternal.tagsApi.createTag({ tagName });
    return this.shipEngineInternal.tagsApi.listTags();
  }
}
