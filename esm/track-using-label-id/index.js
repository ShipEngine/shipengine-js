import { get } from "../client";
import * as TrackUsingLabelIdTypes from "./types/public";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";
export { TrackUsingLabelIdTypes };
/**
 * Returns the tracking information of a package identified by its label id.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id
 */
export async function trackUsingLabelId(labelId, config) {
    validateParams(labelId);
    const response = await get(`/v1/labels/${labelId}/track`, config);
    return formatResponse(response);
}
//# sourceMappingURL=index.js.map