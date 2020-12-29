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
  ShipEngineError,
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

type TrackingInformationLogResponse =
  | GetTrackingLogResponseBody
  | GetTrackingLogFromLabelResponseBody;

export const mapToTrackingInformation = (
  response: TrackingInformationLogResponse
): TrackingInformation => {
  const {
    tracking_number,
    events,
    estimated_delivery_date,
    carrier_status_description,
  } = response;

  if (
    // carrier_status_description does not always refer to events in the events array
    // it can also indicate a requestion failure, e.g. somethibg like "Invalid Tracking Number"
    carrier_status_description &&
    !events?.length &&
    !estimated_delivery_date
  ) {
    throw new ShipEngineError(carrier_status_description);
  }

  return new TrackingInformation(
    tracking_number || '',
    new ISOString(estimated_delivery_date || ''),
    (events || []).map(mapToTrackEvents)
  );
};
