import { NormalizedConfig } from "../config";
import { get } from "../client";
import * as TrackUsingLabelIdTypes from "./types/public";
import { Response } from "./types/private";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";

export { TrackUsingLabelIdTypes };

/**
 * Returns the tracking information of a package identified by its label id.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id
 */
export async function trackUsingLabelId(
  labelId: string,
  config: NormalizedConfig
): Promise<TrackUsingLabelIdTypes.Response> {
  validateParams(labelId);

  const response = await get<Response.GetTrackingLogFromLabelResponseBody>(
    `/v1/labels/${labelId}/track`,
    config
  );

  return formatResponse(response);
}
