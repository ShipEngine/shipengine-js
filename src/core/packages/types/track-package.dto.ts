// To parse this data:
//
//   import { Convert, TrackPackageResult } from "./file";
//
//   const trackPackageResult = Convert.toTrackPackageResult(json);

export interface TrackPackageResult {
  information: Information;
  messages: MessagesObject;
}

export interface Information {
  estimatedDelivery: string;
  events: EventElement[];
  trackingNumber: string;
}

export interface EventElement {
  carrierDetailCode: null | string;
  carrierStatusCode: null | string;
  dateTime: string;
  description: string;
  location?: LocationObject;
  signer?: null | string;
  status: Status;
}

export interface LocationObject {
  cityLocality?: null | string;
  countryCode?: null | string;
  latitude?: number | null;
  longitude?: number | null;
  postalCode?: null | string;
  stateProvince?: null | string;
}

export enum Status {
  Accepted = 'ACCEPTED',
  AttemptedDelivery = 'ATTEMPTED DELIVERY',
  Delivered = 'DELIVERED',
  Exception = 'EXCEPTION',
  InTransit = 'IN TRANSIT',
  Unknown = 'UNKNOWN',
}

export interface MessagesObject {
  errors?: string[];
  info?: string[];
  warnings?: string[];
}

export interface TrackPackageParams {
  carrierCode?: string;
  trackingNumber?: string;
  packageId?: string;
}
