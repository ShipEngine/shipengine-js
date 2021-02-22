import { ShipEngineAPI } from './shared/models/public/shipengine-api';
import { ShipEngineRpcApiClient } from './shared/models/shipengine-rpc/shipengine-rpc-api';
import { ServiceFactory } from './shared/services/service-factory';

// https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShipEngine extends ShipEngineAPI {}

/**
 * This class encapsulates the entire public API of the ShipEngine SDK
 *
 */
export class ShipEngine implements ShipEngineAPI {
  constructor(apiKey: string, baseUrl?: string) {
    // assign all properties to this class.
    return Object.assign(
      this,
      ServiceFactory(new ShipEngineRpcApiClient(apiKey, baseUrl))
    );
  }
}
