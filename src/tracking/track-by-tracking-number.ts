import { CarrierCode, ErrorCode, ErrorType } from "../enums";
import { InvalidFieldValueError, ShipEngineError } from "../errors";
import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import * as assert from "../utils/assert";
import { isCarrierCode } from "../utils/type-guards";
import {
  TrackingInfoParams,
  TrackPackageByTrackingNumberResult,
} from "./public-types";
import {
  TrackPackageByTrackingNumberRPCParams,
  TrackPackageByTrackingNumberRpcResult,
  callJsonRpcMethod,
} from "../json-rpc";

/**
 * Retrieves tracking info using the carrier code and the carrier's tracking number.
 */
export async function trackPackageByTrackingNumber(
  trackingInfo: TrackingInfoParams,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TrackPackageByTrackingNumberResult> {
  // validateTrackingParams(trackingInfo);

  const params = {
    tracking_number: trackingInfo.trackingNumber,
    carrier_code: trackingInfo.carrierCode,
  };
  const result: TrackPackageByTrackingNumberRpcResult = await callJsonRpcMethod(
    "package/track",
    params,
    config,
    events
  );

  console.log(result);
  return result;
}

function validateTrackingParams(
  params: TrackPackageByTrackingNumberRPCParams
): void {
  assert.isPOJO("TrackingInfoParams", params);
  validateCarrierCode(params.carrierCode);
  validateTrackingNumber(params.trackingNumber);
}

function validateCarrierCode(code: CarrierCode): void {
  if (!code) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.FieldValueRequired,
      "Invalid input. The carrier code is required."
    );
  }

  if (!isCarrierCode(code)) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.InvalidFieldValue,
      `Invalid carrier code. ${code} is not a valid carrier code.`
    );
  }
}

function validateTrackingNumber(value: string): void {
  assert.isNonWhitespaceString("trackingNumber", value);
  assert.isNonEmptyString("trackingNumber", value);
  validateStringLength("trackingNumber", value, 1000);
}

function validateStringLength(
  field: string,
  value: string,
  length: number
): void {
  if (value.length > length) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.InvalidFieldValue,
      `Invalid ${field}. The value must not be more than ${length} characters.`
    );
  }
}

// function convertCountryCode(code: CarrierCode): string {
//
//   return CarrierCode[code];
//   }
// }

function createTrackPackageByTrackingNumberResult(
  result: TrackPackageByTrackingNumberRpcResult
): TrackPackageByTrackingNumberResult {
  shipment:







}
