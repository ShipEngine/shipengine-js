"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsingLabelId = exports.TrackUsingLabelIdTypes = void 0;
const client_1 = require("../client");
const TrackUsingLabelIdTypes = require("./types/public");
exports.TrackUsingLabelIdTypes = TrackUsingLabelIdTypes;
const format_response_1 = require("./format-response");
const validate_params_1 = require("./validate-params");
/**
 * Returns the tracking information of a package identified by its label id.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id
 */
async function trackUsingLabelId(labelId, config) {
    validate_params_1.validateParams(labelId);
    const response = await client_1.get(`/v1/labels/${labelId}/track`, config);
    return format_response_1.formatResponse(response);
}
exports.trackUsingLabelId = trackUsingLabelId;
//# sourceMappingURL=index.js.map