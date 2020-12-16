import { isCompletelyNullOrEmptyObject } from '../../utils';
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
 * types are not nested (e.g. TrackingEvent versus Tracking.Event)
 */
interface TrackingEventLocation {
  cityLocality?: string;
  stateProvince?: string;
  postalCode?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
}

export class TrackingEvent {
  dateTime: ISOString;
  status: TrackingStatus;
  description: string;
  carrierStatusCode: string;
  carrierDetailCode: string;
  location?: TrackingEventLocation;
  notes: string[];
  signer?: string;
  constructor(
    dateTime: ISOString,
    status: TrackingStatus,
    description: string,
    carrierStatusCode: string,
    carrierDetailCode: string,
    notes: string[],
    location: TrackingEventLocation,
    signer?: string
  ) {
    this.dateTime = dateTime;
    this.status = status;
    this.description = description;
    this.carrierStatusCode = carrierStatusCode;
    this.carrierDetailCode = carrierDetailCode;
    if (location && !isCompletelyNullOrEmptyObject(location)) {
      this.location = location;
    }
    this.notes = notes;
    this.signer = signer;
  }
}
