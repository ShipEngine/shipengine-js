import type { AddressesService } from '../../services/addresses';
import type { TrackingService } from '../../services/tracking';

/**
 * Aggregation of the entire shipengine-js API
 */
export interface ShipEngineAPI extends TrackingService, AddressesService {}
