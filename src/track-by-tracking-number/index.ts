import { NormalizedConfig } from "../config";
import { get } from "../client";
import * as TrackPackageByLabelIdTypes from "./types/public";
import { Response } from "./types/private";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";

export * as TrackByTrackingNumberTypes from "./types/public";

/**
 * Returns the tracking information of a package identified by its tracking number and carrier code.
 *
 * @see https://www.shipengine.com/docs/tracking
 */
export async function trackPackage(
  params: TrackPackageByLabelIdTypes.Params,
  config: NormalizedConfig
): Promise<TrackPackageByLabelIdTypes.Response> {
  validateParams(params);

  const response = await get<Response.GetTrackingLogResponseBody>(
    `/v1/tracking?carrier_code=${params.carrierCode}&tracking_number${params.trackingNumber}`,
    config
  );

  return formatResponse(response);
}
