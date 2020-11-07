import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsService } from './tags';

export class ServiceFactory {
  public tags: TagsService;
  public constructor(client: ShipEngineApiClient) {
    this.tags = new TagsService(client);
  }
}
