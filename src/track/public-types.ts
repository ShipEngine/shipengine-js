import { WeightUnit, DimensionUnit } from "../enums";
import { CarrierAccount } from "../carrier/public-types";
import { URL } from "url";

export type TrackingParams = TrackByPackageParams | TrackByNumberParams;

export interface TrackByPackageParams {
  packageId: string;
}

export interface TrackByNumberParams {
  trackingNumber: string;
  carrierCode: string;
}

export interface Package {
  trackingNumber: string;
  trackingURL?: URL | string;
  packageId?: string;
  weight?: Weight;
  dimensions?: Dimensions;
}

export interface Shipment {
  shipmentId?: string;
  carrierId?: string;
  carrierAccount: CarrierAccount;
  carrier?: Carrier;
  estimatedDeliveryDateTime: Date;
  actualDeliveryDateTime: Date | undefined;
}

export interface Carrier {
  name: string;
  code: string;
}

export interface Weight {
  value?: number;
  unit?: WeightUnit | string;
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  unit?: DimensionUnit | string;
}

export interface Event {
  dateTime: Date;
  carrierDateTime: Date;
  status: string;
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
  countryCode?: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude?: number;
  longitude?: number;
}

export interface TrackPackageResult {
  shipment: Shipment;
  package: Package;
  events: Event[];
  latestEvent?: Event;
  hasErrors: boolean;
  errors: Event[];
}
