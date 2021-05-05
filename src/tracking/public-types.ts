import { Url } from "url";

import {
  WeightUnit,
  DimensionUnit,
  Country,
  TrackingStatus,
  CarrierCode,
} from "../enums";

export interface Package {
  trackingNumber: string;
  trackingUrl: Url;
  packageId?: string;
  weight?: Weight;
  dimensions?: Dimensions;
}

export interface Shipment {
  shipmentId?: string;
  carrierId?: string;
  carrierCode: string;
  carrier: Carrier;
  estimatedDeliveryDateTime: string;
  // Filled in from last event (assuming status is delivered)
  actualDeliveryDateTime: string;
}

export interface Carrier {
  name: string;
  code: string;
}

export interface Weight {
  value: number;
  unit: WeightUnit;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
}

export interface Event {
  dateTime: string;
  carrierDateTime: string;
  status: TrackingStatus;
  description?: string;
  carrierStatusCode?: string;
  carrierDetailCode?: string;
  signer?: string;
  location?: Location;
}

export interface Location {
  cityLocality?: string;
  stateProvince?: string;
  postalCode?: string;
  countryCode?: Country;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TrackingInfoParams {
  carrierCode: CarrierCode;
  trackingNumber: string;
}

export interface TrackPackageByTrackingNumberResult {
  shipment: Shipment;
  package: Package;
  events: Event[];
  latestEvent: Event;
  hasErrors: boolean;
  errors: Event[];
}
