import { ISOString } from './DateTime';

/**
 * Shipment Statuses
 * NOTE: [status codes](https://www.shipengine.com/docs/tracking/#tracking-status-codes).
 */
export enum TrackingStatus {
  Accepted = 'AC',
  AttemptedDelivery = 'AT',
  Delivered = 'DE',
  Exception = 'EX',
  InTransit = 'IT',
  NotYetInSystem = 'NY',
  Unknown = 'UN',
}

/**
 * A location
 */
interface TrackingEventLocation {
  /* City or locality. */
  cityLocality?: string;

  /* State or province. */
  stateProvince?: string;

  /* Postal code. */
  postalCode?: string;

  /* [ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) country code. */
  country?: string;

  /* Latitude. */
  latitude?: number;

  /* Longitude. */
  longitude?: number;
}

/* An event or status change that occurred while processing a `Shipment`. */
export interface TrackingEvent {
  /* Date, datetime, or datetime w/timezone at which the event occurred. */
  dateTime: ISOString;

  /* Status of the shipment. */
  status: TrackingStatus;

  /* Long-form description of the status */
  description: string;

  /*  Carrier-specific event or status code. */
  carrierStatusCode: string;

  /* Carrier-specific description */
  carrierDetailCode: string;

  /* Location where the event occurred. */
  location?: TrackingEventLocation;

  /* Human-readable information regarding this event, such as details about the error state
   * or a description of where the package was placed upon delivery.
   */
  notes: string[];

  /*  Name of the person who signed or approved this event.
   * This is usually only relevant for the TrackingStatus.Delivered event.
   */
  signer?: string;
}

export interface TrackingInformation {
  /* Carrier code for the shipment. */
  carrierCode: string;

  /* Tracking number for the shipment. */
  trackingNumber: string;

  /* Date, datetime, datetime w/timestamp estimated delivery. */
  estimatedDelivery: ISOString;

  /* `Event`s that have occurred for this shipment. */
  events: TrackingEvent[];

  /*  Returns the latest `Event`. */
  readonly latestEvent?: TrackEvent;

  /*  The datetime of the first "accepted" event in the `events` array, if any. */
  readonly shippedAt?: ISOString;

  /* The datetime of the last "delivered" event in the `events` array, if any. */
  readonly deliveredAt?: ISOString;
}

export interface TrackingQuery {
  /* Tracking number of the shipment being queried. */
  trackingNumber: string;
  /* Carrier code of the shipment being queried. */
  carrierCode: string;
}

/* Result of a tracking query. */
export interface TrackingQueryResult {
  /* Either a `Query` or `String` representing a label_id. */
  query: TrackingQuery | string;

  /* Information. */
  information: TrackingInformation;
}
