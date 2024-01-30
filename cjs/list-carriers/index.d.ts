import { NormalizedConfig } from "../config";
import * as ListCarriersTypes from "./types/public";
export { ListCarriersTypes };
/**
 * This function returns a list of all your connected carrier accounts,
 * along with helpful information about each account, its options, the services it offers, etc.
 *
 * https://www.shipengine.com/docs/reference/list-carriers/
 */
export declare function listCarriers(config: NormalizedConfig): Promise<ListCarriersTypes.Result>;
