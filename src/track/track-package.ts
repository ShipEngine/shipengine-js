import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { createTrackPackageResult } from "./create-track-package-result";
import { TrackingParams, TrackPackageResult } from "./public-types";
import {
  callJsonRpcMethod,
  TrackPackageDTO,
  TrackPackageRPCParams,
} from "../json-rpc";
import { validateTrackingParams } from "./util";

export async function trackPackage(
  trackingInfo: TrackingParams,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TrackPackageResult> {
  const params: TrackPackageRPCParams = validateTrackingParams(trackingInfo);

  const result: TrackPackageDTO = await callJsonRpcMethod(
    "package.track.v1",
    params,
    config,
    events
  );
  return await createTrackPackageResult(result, config, events);
}
