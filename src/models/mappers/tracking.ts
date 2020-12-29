import {
  GetTrackingLogFromLabelResponseBody,
  GetTrackingLogResponseBody,
  TrackEventInternal,
} from '../shipengine-rest/shipengine-openapi/tracking';
import {
  TrackingEvent,
  TrackingInformation,
  ISOString,
  TrackingStatus,
} from '../public';

export const mapToTrackEvents = (e: TrackEventInternal): TrackingEvent => {
  return new TrackingEvent(
    e.occurred_at,
    e.status_code as TrackingStatus, // status of the shipment e.g. (IT = In transit)
    e.status_description, // why would status description be empty, if status isn't?,
    e.carrier_status_code,
    e.carrier_detail_code,
    {
      cityLocality: e.city_locality,
      country: e.country_code,
      latitude: e.latitude,
      longitude: e.longitude,
      postalCode: e.postal_code,
    },
    e.signer || undefined,
    e.exception_description || undefined,
    e.carrier_status_description || undefined
  );
};

export const mapToTrackingInformation = (
  trackingInformationResponse:
    | GetTrackingLogResponseBody
    | GetTrackingLogFromLabelResponseBody
): TrackingInformation | undefined => {
  const {
    tracking_number,
    events,
    estimated_delivery_date,
  } = trackingInformationResponse;

  // validate response
  if (!tracking_number || !events || !estimated_delivery_date) {
    return undefined;
  }

  return new TrackingInformation(
    tracking_number,
    new ISOString(estimated_delivery_date),
    (events || []).map(mapToTrackEvents)
  );
};
