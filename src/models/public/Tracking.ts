import { ISOString } from './DateTime';
import { findLast, flatten, last } from '../../utils';
import {
  getMessageMixin,
  MessageFields,
  ShipEngineError,
  ShipEngineInfo,
  ShipEngineMessage,
} from './Messages';

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
export interface TrackingEvent extends ReturnType<typeof getMessageMixin> {}
export class TrackingEvent {
  readonly #messages: ShipEngineMessage[];

  /** Expose message as proto method since prototype methods do _not_ show up in the public API (since they are not spreadable) ). */
  get messages() {
    return this.#messages;
  }

  /* Date, datetime, or date:time w/timezone at which the event occurred. */
  readonly dateTime: ISOString;

  /* Location where the event occurred. */
  readonly location?: TrackingEventLocation;

  /* Status of the shipment. */
  readonly status: TrackingStatus;

  /* Long-form description of the status */
  readonly description: string;

  /*  Carrier-specific event or status code. */
  readonly carrierStatusCode: string;

  /* Carrier-specific description */
  readonly carrierDetailCode: string;

  /*  Name of the person who signed or approved this event.
   * This is usually only relevant for the TrackingStatus.Delivered event.
   */
  readonly signer?: string;

  constructor(
    dateTime: string,
    status: TrackingStatus,
    description: string,
    carrierStatusCode: string,
    carrierDetailCode: string,
    location: TrackingEventLocation,
    signer?: string,
    exceptionDescription?: string,
    carrierStatusDescription?: string
  ) {
    this.#messages = [];
    exceptionDescription &&
      this.messages.push(new ShipEngineError(exceptionDescription));

    carrierStatusDescription &&
      this.messages.push(new ShipEngineInfo(carrierStatusDescription));

    Object.assign(this, getMessageMixin(this.#messages));
    // if all values are undefined, object is undefined.
    const maybeLocation = Object.values(location).some(Boolean)
      ? location
      : undefined;
    if (maybeLocation) {
      this.location = maybeLocation;
    }
    this.dateTime = new ISOString(dateTime);
    this.status = status;
    this.description = description;
    this.carrierStatusCode = carrierStatusCode;
    this.carrierDetailCode = carrierDetailCode;
    if (signer) {
      this.signer = signer;
    }
  }
}

interface TrackingEventsInfo {
  latestEvent?: TrackingEvent;
  shippedAt?: ISOString;
  deliveredAt?: ISOString;
  events: TrackingEvent[];
}

export const getEventsMixin = (events: TrackingEvent[]): TrackingEventsInfo => {
  // tracking event should be _sorted_ with earliest event first (date ascending)
  const sortedDateAsc = events.sort((a, b) =>
    a.dateTime.value < b.dateTime.value ? -1 : 1
  );

  const latestEvent = last(sortedDateAsc);

  const shippedAt = findLast(
    (el) => el.status === TrackingStatus.Accepted,
    sortedDateAsc
  )?.dateTime;

  const deliveredAt = findLast(
    (el) => el.status === TrackingStatus.Delivered,
    sortedDateAsc
  )?.dateTime;

  return {
    events: sortedDateAsc,
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
    Object.assign(this, getEventsMixin(trackingEvents));
    this.estimatedDelivery = estimatedDelivery;
    this.trackingNumber = trackingNumber;
  }
}

export type TrackingQueryByPackageId = string;

export type TrackingQuery =
  | TrackingQueryByPackageId
  | TrackingQueryByTrackingNumber;

export type TrackingQueryByTrackingNumber = {
  /* Tracking number of the shipment being queried. */
  trackingNumber: string;
  /* Carrier code of the shipment being queried. */
  carrierCode: string;
};

export const isTrackingQueryByPackageId = (
  t: TrackingQuery
): t is TrackingQueryByPackageId => {
  return typeof t === 'string';
};

/* Result of a tracking query. */
export interface TrackingQueryResult extends MessageFields {}
export class TrackingQueryResult {
  readonly query: TrackingQuery;
  readonly information: TrackingInformation | undefined;
  constructor(
    query: TrackingQuery,
    information: TrackingInformation | undefined
  ) {
    this.information = information;
    this.query = query;
    const messages = information
      ? flatten(information.events.map((el) => el.messages))
      : [new ShipEngineError('Could not get information.')];

    Object.assign(this, getMessageMixin(messages));
  }
}
