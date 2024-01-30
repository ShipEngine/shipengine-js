import { NormalizedConfig } from "../config";
import * as TrackUsingCarrierCodeAndTrackingNumberTypes from "./types/public";
export { TrackUsingCarrierCodeAndTrackingNumberTypes };
/**
 * Returns the tracking information of a package identified by its tracking number and carrier code.
 *
 * @see https://www.shipengine.com/docs/tracking
 */
export declare function trackUsingCarrierCodeAndTrackingNumber(params: TrackUsingCarrierCodeAndTrackingNumberTypes.Params, config: NormalizedConfig): Promise<TrackUsingCarrierCodeAndTrackingNumberTypes.Result>;
