import { ShipEngineRpcApi } from '../shipengine-rpc/shipengine-rpc-api';

export abstract class BaseShipEngineData {
  constructor(protected api: ShipEngineRpcApi) {}
}
