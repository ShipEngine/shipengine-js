import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { createTrackPackageResult } from "./create-track-package-result";
import { TrackingParams, TrackPackageResult } from "./public-types";
import { callJsonRpcMethod, TrackPackageDTO } from "../json-rpc";

export async function trackPackage(
  trackingInfo: TrackingParams,
  trackingMethod: string,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TrackPackageResult> {
  // Validate input
  const result: TrackPackageDTO = await callJsonRpcMethod(
    "package.track.v1",
    trackingInfo,
    config,
    events
  );
  return await createTrackPackageResult(result, trackingMethod);
}
