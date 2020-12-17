import { mapToApiServiceConfig } from './models/mappers/shipengine-api-client';
import type { ShipEngineAPI, ShipEngineConfig } from './models/public';
import { ServiceFactory } from './services/service-factory';
import { ShipEngineApiClient } from './services/shipengine-api-factory';

// https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShipEngine extends ShipEngineAPI {}

/**
 * This class encapsulates the entire public API of the ShipEngine SDK
 *
 */
export class ShipEngine implements ShipEngineAPI {
  constructor(config: ShipEngineConfig) {
    // assign all properties to this class.
    return Object.assign(
      this,
      ServiceFactory(ShipEngineApiClient(mapToApiServiceConfig(config)))
    );
  }
}
