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
  estimated_delivery: string;
  events: EventElement[];
  tracking_number: string;
}

export interface EventElement {
  carrier_detail_code: null | string;
  carrier_status_code: null | string;
  date_time: string;
  description: string;
  location?: LocationObject;
  signer?: null | string;
  status: Status;
}

export interface LocationObject {
  city_locality?: null | string;
  country_code?: null | string;
  latitude?: number | null;
  longitude?: number | null;
  postal_code?: null | string;
  state_province?: null | string;
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

/***************/
// To parse this data:
//
//   import { Convert, TrackPackageParams } from "./file";
//
//   const trackPackageParams = Convert.toTrackPackageParams(json);

export interface TrackPackageParams {
  carrier_code?: string;
  tracking_number?: string;
  package_id?: string;
}
