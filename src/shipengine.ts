import { RetryBackOffType, ShipEngineAPI } from './models/public';
import { ServiceFactory } from './services/service-factory';
import { ShipEngineApiClient } from './services/shipengine-api-factory';

// https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShipEngine extends ShipEngineAPI {}

export interface ShipEngineConfig {
  baseUrl?: string;
  retryBackoffType?: RetryBackOffType;
}

/**
 * This class encapsulates the entire public API of the ShipEngine SDK
 *
 */
export class ShipEngine implements ShipEngineAPI {
  constructor(apiKey: string, config?: ShipEngineConfig) {
    // assign all properties to this class.
    return Object.assign(
      this,
      ServiceFactory(ShipEngineApiClient(apiKey, config))
    );
  }
}
