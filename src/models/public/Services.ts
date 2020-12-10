import { AddressesServiceAPI } from '../../services/address';
import { TagsServiceAPI } from '../../services/tags';

/**
 * Aggregation of the entire shipengine-js API
 */
export type ShipEngine = TagsServiceAPI & AddressesServiceAPI;
