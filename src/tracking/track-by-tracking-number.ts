import {
  CarrierCode,
  CarrierName,
  DimensionUnit,
  ErrorCode,
  ErrorType,
  WeightUnit,
  TrackingStatus,
} from "../enums";
import { ShipEngineError } from "../errors";
import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import * as assert from "../utils/assert";
import { isCarrierCode } from "../utils/type-guards";

import {
  TrackingInfoParams,
  TrackPackageByTrackingNumberResult,
} from "./public-types";

import {
  callJsonRpcMethod,
  TrackPackageByTrackingNumberDTO,
  TrackPackageByTrackingNumberRPCParams,
} from "../json-rpc";

import { EventDTO } from "./../json-rpc/types";
/**
 * Retrieves tracking info using the carrier code and the carrier's tracking number.
 */
export async function trackPackageByTrackingNumber(
  trackingInfo: TrackingInfoParams,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TrackPackageByTrackingNumberResult> {
  validateTrackingParams(trackingInfo);

  const { trackingNumber, carrierCode } = trackingInfo;
  const params = {
    trackingNumber,
    carrierCode,
  };
  const result: TrackPackageByTrackingNumberDTO = await callJsonRpcMethod(
    "package.track.v1",
    params,
    config,
    events
  );

  // console.log(result);
  return createTrackPackageByTrackingNumberResult(result);
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

function createTrackPackageByTrackingNumberResult(
  result: TrackPackageByTrackingNumberDTO
) {
  const { shipment, events } = result;

  const returnValue = {
    shipment: {
      shipmentID: shipment.shipmentID || "",
      carrierID: shipment.carrierAccountID || "",
      carrier: {
        name:
          CarrierName[
            shipment.carrierCode.toUpperCase() as keyof typeof CarrierName
          ],
        code: shipment.carrierCode,
      },
      carrierAccount: undefined,
      estimatedDeliveryDateTime: shipment.estimatedDelivery,
      // Create function to calculated this from the events
      actualDeliveryDateTime: undefined,
    },
    package: {
      packageID: result.package.packageID,
      trackingNumber: result.package.trackingNumber,
      // Where to get this?
      trackingURL: new URL("https://www.fedex.com"),
      weight: result.package.weight,
      dimensions: result.package.dimensions,
    },
    events: events.map((e: EventDTO) => {
      return {
        dateTime: e.timestamp,
        carrierDateTime: e.carrierTimeStamp,
        status: e.status,
        description: e.description,
        carrierStatusCode: e.carrierStatusCode,
        carrierDetailCode: e.carrierDetailCode,
        signer: e.signer,
        location: e.location,
      };
    }),
    // Add function to check for latest timestamp and/or status
    // latestEvent: events.slice(-1),
    hasErrors: false,
    // errors: events[0],
  };
  return returnValue;
}
