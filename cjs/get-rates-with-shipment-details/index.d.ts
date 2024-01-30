import { NormalizedConfig } from "../config";
import * as GetRatesWithShipmentDetailsTypes from "./types/public";
export { GetRatesWithShipmentDetailsTypes };
/**
 * Retrieve various rates for a shipmnent.
 *
 * https://www.shipengine.com/docs/rates/
 */
export declare function getRatesWithShipmentDetails(params: GetRatesWithShipmentDetailsTypes.Params, config: NormalizedConfig): Promise<GetRatesWithShipmentDetailsTypes.Result>;
