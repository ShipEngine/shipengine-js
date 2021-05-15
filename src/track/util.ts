import { Event } from "./public-types";
import { EventDTO } from "../json-rpc";
import { ShipEngineError } from "../errors";
import { CarrierCode, ErrorCode, ErrorType } from "../enums";
import { isCarrierCode } from "../utils/type-guards";
import * as assert from "../utils/assert";
import { carrierNames } from "../carrier/carrier-names";

export function getExceptions(events: Event[]): Event[] {
  const exceptionEvents: Event[] = [];
  for (const e of events) {
    if (e.status === "Exception") {
      exceptionEvents.push(e);
    }
  }
  return exceptionEvents;
}

export function formatEvents(events: EventDTO[]): Event[] {
  return events.map((e: EventDTO) => {
    return {
      dateTime: e.timestamp,
      carrierDateTime: e.carrierTimeStamp,
      status: e.status || "",
      description: e.description || "",
      carrierStatusCode: e.carrierStatusCode || "",
      carrierDetailCode: e.carrierDetailCode || "",
      signer: e.signer || "",
      location: {
        cityLocality: e.location?.cityLocality || "",
        stateProvince: e.location?.stateProvince || "",
        postalCode: e.location?.postalCode || "",
        countryCode: e.location?.countryCode || "",
        coordinates: {
          latitude: e.location?.coordinates?.latitude || 0,
          longitude: e.location?.coordinates?.latitude || 0,
        },
      },
    };
  });
}

export function getCarrierName(carrierCode: string): string {
  return carrierNames[carrierCode] || "";
}

export function validateStringLength(
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

export function validateCarrierCode(code: CarrierCode): void {
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

export function validateTrackingNumber(value: string): void {
  assert.isNonWhitespaceString("trackingNumber", value);
  assert.isNonEmptyString("trackingNumber", value);
  validateStringLength("trackingNumber", value, 1000);
}

export function validatePackageId(value: string): void {
  assert.isNonWhitespaceString("packageId", value);
  assert.isNonEmptyString("packageId", value);
  validateStringLength("packageId", value, 1000);
  if (
    !value.match(
      /^pkg_[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/
    )
  ) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.InvalidFieldValue,
      `Invalid packageId.`
    );
  }
}

export function getActualDeliveryDateTime(events: Event[]): string {
  const deliveredEvents = events.filter(
    (event) => event.status === "delivered"
  );

  // Relying on RPC API to handle sorting events by dateTime
  if (deliveredEvents.length > 0) {
    const e = deliveredEvents.pop();

    // Couldn't not suppress undefined warnings even with if statement above
    return e!.dateTime;
  }

  // TODO Update when dateTime handling is implemented
  return "";
}
