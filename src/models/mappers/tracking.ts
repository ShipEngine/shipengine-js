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

/**
 * Returns domain model from DTO
 *
 * @param e - Tracking event from ShipEngine REST API.
 */
export const mapToTrackEvents = (e: TrackEventInternal): TrackingEvent => {
  return {
    location: {
      cityLocality: e.city_locality,
      country: e.country_code,
      latitude: e.latitude,
      longitude: e.longitude,
      postalCode: e.postal_code,
    },
    signer: e.signer,
    carrierDetailCode: e.carrier_detail_code,
    status: e.status_code as TrackingStatus, // status of the shipment e.g. (IT = In transit)
    description: e.status_description || '', // why would status description be empty, if status isn't?,
    carrierStatusCode: e.carrier_status_code || '',
    dateTime: new ISOString(e.occurred_at),
    hasError: status === 'error', // TODO
  };
};

/**
 * Returns domain model from DTO.
 *
 * @param v - Address validation result from ShipEngine REST API.
 */
export const mapToTrackingInformation = (
  v: GetTrackingLogResponseBody | GetTrackingLogFromLabelResponseBody
): TrackingInformation => {
  if (!v.tracking_number || !v.events || !v.estimated_delivery_date) {
    console.error('missing some critical information.');
  }
  return new TrackingInformation(
    v.tracking_number || '',
    new ISOString(v.estimated_delivery_date || ''),
    (v.events || []).map(mapToTrackEvents)
  );
};
