import { AddressService } from '../../core/address/service';
import { TagsService } from '../../core/tags/service';
import { ShipEngineAPI } from '../models/public/shipengine-api';
import { ShipEngineRpcApiClient } from '../models/shipengine-rpc/shipengine-rpc-api';

export const ServiceFactory = (api: ShipEngineRpcApiClient): ShipEngineAPI => {
  return {
    ...new TagsService(api),
    ...new AddressService(api)
  };
};
