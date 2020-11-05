import { ShipEngineInternal } from './services-internal/shipengine';

export class ShipEngine {
  private shipEngineInternal;
  constructor(apiKey: string) {
    this.shipEngineInternal = new ShipEngineInternal(apiKey);
  }
  public async getTagNames(): Promise<string[]> {
    const { tags } = await this.shipEngineInternal.tagsApi.listTags();
    if (!tags) return [];
    return tags?.map((el: any) => el.tagName);
  }
  public async createTagAndAlsoGetTagNames(tagName: string) {
    await this.shipEngineInternal.tagsApi.createTag({ tagName });
    const data = await this.getTagNames();
    return data;
  }
}
