import { Response } from "./types/private";
import { TrackByLabelIdTypes } from ".";
import {
  TrackingEvent,
  TrackingStatusCodes,
  TrackingStatusDescription,
} from "./types/public";

export function formatResponse(
  response: Response.GetTrackingLogFromLabelResponseBody
): TrackByLabelIdTypes.Response {
  return formatTrackByLabelIdResult(response);
}

function formatTrackByLabelIdResult(
  result: Response.GetTrackingLogFromLabelResponseBody
): TrackByLabelIdTypes.TrackByLabelIdResult {
  return {
    trackingNumber: result.tracking_number || "",
    statusCode: (result.status_code as TrackingStatusCodes) || "UN",
    statusDescription:
      (result.status_description as TrackingStatusDescription) || "Unknown",
    carrierStatusCode: result.carrier_status_code || "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    description: event.description!,
    cityLocality: event.city_locality,
    stateProvince: event.state_province,
    postalCode: event.postal_code,
    countryCode: event.country_code || "",
    companyName: event.company_name || "",
    signer: event.signer || "",
    eventCode: event.event_code || "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    statusCode: event.status_code! || "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    carrierStatusCode: event.carrier_status_code! || "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    carrierDetailCode: event.carrier_detail_code! || "",
    latitude: event.latitude,
    longitude: event.longitude,
  };
}
