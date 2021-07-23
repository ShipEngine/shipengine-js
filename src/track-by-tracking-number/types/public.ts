import {
  TrackingStatusCodes,
  TrackingStatusDescription,
} from "../../enums/tracking-status";

export type Params = { labelId: string };

export type Response = TrackPackageByTrackingNumberResult;

/**
 * The Tracking information and events associated with a label
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id/
 */
export interface TrackPackageByTrackingNumberResult {
  /**
   * A tracking number for a package. The format depends on the carrier.
   */
  trackingNumber: string;

  /**
   * Status Code
   */
  statusCode: TrackingStatusCodes;

  /**
   * Status Description
   */
  statusDescription: TrackingStatusDescription;

  /**
   * Carrier Detail Code
   */
  carrierDetailCode: string;

  /**
   * Carrier Status Code
   */
  carrierStatusCode: string;

  /**
   * Carrier Status Description
   */
  carrierStatusDescription: string;

  /**
   * An ISO 8601 string that represents a date and time.
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */

  shipDate: string;

  /**
   * An ISO 8601 string that represents a date and time.
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  estimatedDeliveryDate: string;

  /**
   * An ISO 8601 string that represents a date and time.
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  actualDeliveryDate: string;

  /**
   * Exception description
   */
  exceptionDescription: string;

  /**
   * The events that have occured during the lifetime of this tracking number.
   */
  events: TrackingEvent[];
}

/**
 * The events that have occurred during the lifetime of this tracking number.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id/
 */
export interface TrackingEvent {
  /**
   * Timestamp for carrier event
   */
  occurredAt: string;

  /**
   * Carrier timestamp for the event, it is assumed to be the local time of where the event occurred.
   */
  carrierOccurredAt: string;

  /**
   * Event description
   */
  description: string;

  /**
   * City Locality
   */
  cityLocality: string;

  /**
   * State Province
   */
  stateProvince: string;

  /**
   * Postal Code
   */
  postalCode: string;

  /**
   * The ISO 3166 country code
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */
  countryCode: string;

  /**
   * Company Name
   */
  companyName: string;

  /**
   * Signer information
   */
  signer: string;

  /**
   * Event Code
   */
  eventCode: string;

  /**
   * Event status code
   */
  statusCode: string;

  /**
   * Carrier Status Code
   */
  carrierStatusCode: string;

  /**
   * Carrier Detail Code
   */
  carrierDetailCode: string;

  /**
   * Latitude coordinate of tracking event
   */
  latitude?: number;

  /**
   * Longitude coordinate of tracking event
   */
  longitude?: number;
}
