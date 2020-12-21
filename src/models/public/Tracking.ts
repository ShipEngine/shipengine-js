import { ISOString } from './DateTime';
import { head, findLast } from '../../utils';

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

export class TrackingInformation {
  /* Tracking number for the shipment. */
  trackingNumber: string;

  /* Date, datetime, datetime w/timestamp estimated delivery. */
  estimatedDelivery: ISOString;

  /*  Returns the latest `Event`. */
  readonly latestEvent?: TrackingEvent;

  /*  The datetime of the first "accepted" event in the `events` array, if any. */
  readonly shippedAt?: ISOString;

  /* The datetime of the last "delivered" event in the `events` array, if any. */
  readonly deliveredAt?: ISOString;

  constructor(
    trackingNumber: string,
    estimatedDelivery: ISOString,
    events: TrackingEvent[]
  ) {
    this.estimatedDelivery = estimatedDelivery;
    this.trackingNumber = trackingNumber;

    // tracking event should be _sorted_ with earliest event first (date ascending)
    const sortedDateAsc = events.sort((a, b) =>
      a.dateTime.value < b.dateTime.value ? -1 : 1
    );

    this.latestEvent = head(sortedDateAsc);

    this.shippedAt = sortedDateAsc.find(
      (el) => el.status === TrackingStatus.Accepted
    )?.dateTime;

    this.deliveredAt = findLast(
      (el) => el.status === TrackingStatus.Delivered,
      sortedDateAsc
    )?.dateTime;
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
