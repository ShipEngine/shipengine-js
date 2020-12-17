import { AddressesService } from '../../services/addresses';
import { TagsService } from '../../services/tags';

/**
 * Aggregation of the entire shipengine-js API
 */
export type ShipEngineAPI = TagsService & AddressesService;
