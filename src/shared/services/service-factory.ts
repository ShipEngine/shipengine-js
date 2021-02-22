import { TagsService } from '../../core/tags/service';
import { ShipEngineAPI } from '../models/public/ShipEngineAPI';
import { TagsRepository } from '../../core/tags/repository';
import { ShipEngineRpcApi } from '../models/shipengine-rpc/shipengine-rpc-api';

export const ServiceFactory = (
  shipEngineAPI: ShipEngineRpcApi
): ShipEngineAPI => {
  return {
    ...new TagsService(new TagsRepository(shipEngineAPI)),
  };
};
