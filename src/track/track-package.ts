import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { createTrackPackageResult } from "./create-track-package-result";
import { TrackingParams, TrackPackageResult } from "./public-types";
import { callJsonRpcMethod, TrackPackageDTO } from "../json-rpc";

export async function trackPackage(
  trackingInfo: TrackingParams,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TrackPackageResult> {
  // TODO: Parameter validation

  const result: TrackPackageDTO = await callJsonRpcMethod(
    "package.track.v1",
    trackingInfo,
    config,
    events
  );
  return await createTrackPackageResult(result, config, events);
}
