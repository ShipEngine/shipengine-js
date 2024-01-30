import { NormalizedConfig } from "../config";
import * as TrackUsingLabelIdTypes from "./types/public";
export { TrackUsingLabelIdTypes };
/**
 * Returns the tracking information of a package identified by its label id.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id
 */
export declare function trackUsingLabelId(labelId: string, config: NormalizedConfig): Promise<TrackUsingLabelIdTypes.Response>;
