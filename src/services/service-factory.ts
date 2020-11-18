import type { ShipEngineApiClient } from './shipengine-api-factory';
import { TagsService } from './tags';

export class ServiceFactory {
  public constructor(client: ShipEngineApiClient) {
    const tags = new TagsService(client);
    Object.assign(this, tags.getAdvancedAPI(), tags.getConvenienceAPI());
  }
}
