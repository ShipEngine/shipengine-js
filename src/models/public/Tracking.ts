import { ISOString } from './DateTime';
import { findLast, last } from '../../utils';

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
  carrierDetailCode?: string;

  /* Location where the event occurred. */
  location?: TrackingEventLocation;

  /*  Name of the person who signed or approved this event.
   * This is usually only relevant for the TrackingStatus.Delivered event.
   */
  signer?: string;

  /* True if the `#status` is an exception. */
  readonly hasError: boolean;
}

interface TrackingEventsInfo {
  latestEvent?: TrackingEvent;
  shippedAt?: ISOString;
  deliveredAt?: ISOString;
}

export const getEventsInfo = (events: TrackingEvent[]): TrackingEventsInfo => {
  // tracking event should be _sorted_ with earliest event first (date ascending)
  const sortedDateAsc = events.sort((a, b) =>
    a.dateTime.value < b.dateTime.value ? -1 : 1
  );

  const latestEvent = last(sortedDateAsc);

  const shippedAt = sortedDateAsc.find(
    (el) => el.status === TrackingStatus.Accepted
  )?.dateTime;

  const deliveredAt = findLast(
    (el) => el.status === TrackingStatus.Delivered,
    sortedDateAsc
  )?.dateTime;

  return {
    latestEvent,
    shippedAt,
    deliveredAt,
  };
};

export interface TrackingInformation extends TrackingEventsInfo {}
export class TrackingInformation {
  /* Tracking number for the shipment. */
  trackingNumber: string;

  /* Date, datetime, datetime w/timestamp estimated delivery. */
  estimatedDelivery: ISOString;

  constructor(
    trackingNumber: string,
    estimatedDelivery: ISOString,
    trackingEvents: TrackingEvent[]
  ) {
    Object.assign(this, getEventsInfo(trackingEvents));
    this.estimatedDelivery = estimatedDelivery;
    this.trackingNumber = trackingNumber;
  }
}

export interface TrackingQuery {
  /* Tracking number of the shipment being queried. */
  trackingNumber: string;
  /* Carrier code of the shipment being queried. */
  carrierCode: string;
}

/* Result of a tracking query. */
export class TrackingQueryResult {
  /* Either a `Query` or `String` representing a label_id. */
  query: TrackingQuery | string;

  /* Information. */
  information: TrackingInformation;
  constructor(query: TrackingQuery | string, information: TrackingInformation) {
    this.query = query;
    this.information = information;
  }
}
