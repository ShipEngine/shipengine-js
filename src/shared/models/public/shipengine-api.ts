import type { TagsService } from '../../../core/tags/service';
import type { AddressService } from '../../../core/address/service';

/**
 * Aggregation of the entire shipengine-js API
 */
export type ShipEngineAPI = TagsService & AddressService;
