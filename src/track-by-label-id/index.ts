import { NormalizedConfig } from "../config";
import { get } from "../client";
import * as TrackPackageByLabelIdTypes from "./types/public";
import { Response } from "./types/private";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";

export * as TrackPackageByLabelIdTypes from "./types/public";

/**
 * Validates an address and returns the full validation results.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id
 */
export async function trackPackageByLabelId(
  params: TrackPackageByLabelIdTypes.Params,
  config: NormalizedConfig
): Promise<TrackPackageByLabelIdTypes.Response> {
  validateParams(params);

  const response = await get<Response.GetTrackingLogFromLabelResponseBody>(
    `/v1/labels/${params.labelId}/track`,
    config
  );

  return formatResponse(response);
}
