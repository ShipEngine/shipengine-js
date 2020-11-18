import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsService } from './tags';

export class ServiceFactory {
  // services
  public tags: TagsService;
  // convenience methods
  public createTag: TagsService['create'];

  public constructor(client: ShipEngineApiClient) {
    this.tags = new TagsService(client);
    this.createTag = this.tags.create;
  }
}
