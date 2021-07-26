import { Response } from "./types/private";
import { TrackByTrackingNumberTypes } from ".";
import { TrackingEvent } from "./types/public";
import {
  TrackingStatusCodes,
  TrackingStatusDescription,
} from "../enums/tracking-status";

export function formatResponse(
  response: Response.GetTrackingLogResponseBody
): TrackByTrackingNumberTypes.Response {
  return formatTrackPackageByLabelIdResult(response);
}

function formatTrackPackageByLabelIdResult(
  result: Response.GetTrackingLogResponseBody
): TrackByTrackingNumberTypes.TrackPackageByTrackingNumberResult {
  return {
    trackingNumber: result.tracking_number || "",
    statusCode: mapStatusCode(result.status_code),
    statusDescription: mapStatusDescription(result.status_description),
    carrierStatusCode: result.carrier_status_code || "",
    carrierDetailCode: result.carrier_detail_code || "",
    carrierStatusDescription: result.carrier_status_description || "",
    shipDate: result.ship_date || "",
    estimatedDeliveryDate: result.estimated_delivery_date || "",
    actualDeliveryDate: result.actual_delivery_date || "",
    exceptionDescription: result.exception_description || "",
    events: result.events ? result.events.map(formatTrackingEvent) : [],
  };
}

function formatTrackingEvent(event: Response.TrackEvent): TrackingEvent {
  return {
    occurredAt: event.occurred_at,
    carrierOccurredAt: event.carrier_occurred_at || "",
    description: event.description,
    cityLocality: event.city_locality,
    stateProvince: event.state_province,
    postalCode: event.postal_code,
    countryCode: event.country_code || "",
    companyName: event.company_name || "",
    signer: event.signer || "",
    eventCode: event.event_code || "",
    statusCode: event.status_code || "",
    carrierStatusCode: event.carrier_status_code || "",
    carrierDetailCode: event.carrier_detail_code || "",
    latitude: event.latitude,
    longitude: event.longitude,
  };
}

function mapStatusCode(type: string | undefined): TrackingStatusCodes {
  switch (type) {
    case "AC":
      return TrackingStatusCodes.Accepted;
    case "IT":
      return TrackingStatusCodes.InTransit;
    case "DE":
      return TrackingStatusCodes.Delivered;
    case "EX":
      return TrackingStatusCodes.Exception;
    case "AT":
      return TrackingStatusCodes.AttemptedDelivery;
    default:
      return TrackingStatusCodes.Unknown;
  }
}

function mapStatusDescription(
  type: string | undefined
): TrackingStatusDescription {
  switch (type) {
    case "Accepted":
      return TrackingStatusDescription.Accepted;
    case "Attempted Delivery":
      return TrackingStatusDescription.InTransit;
    case "Delivered":
      return TrackingStatusDescription.Delivered;
    case "Exception":
      return TrackingStatusDescription.Exception;
    case "In Transit":
      return TrackingStatusDescription.AttemptedDelivery;
    default:
      return TrackingStatusDescription.Unknown;
  }
}
