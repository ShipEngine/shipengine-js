import { CountryCode } from '../../../../../shared/models/country-code';

export interface TrackPackageResultDto {
  events: Event[];
  package: Package;
  shipment: Shipment;
}

export interface Event {
  carrierDateTime: string;
  carrierDetailCode?: string;
  carrierStatusCode: string;
  dateTime: string;
  description: string;
  location?: Location;
  signer?: string;
  status: Status;
}

export interface Location {
  cityLocality?: string;
  coordinates?: GeoCoordinates;
  countryCode?: CountryCode;
  postalCode?: string;
  stateProvince?: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export enum Status {
  Accepted = 'ACCEPTED',
  AttemptedDelivery = 'ATTEMPTED DELIVERY',
  Delivered = 'DELIVERED',
  Exception = 'EXCEPTION',
  InTransit = 'IN TRANSIT',
  Unknown = 'UNKNOWN',
}

export interface Package {
  dimensions?: Dimensions;
  packageid?: string;
  trackingNumber: string;
  trackingurl?: string;
  weight?: Weight;
}

export interface Dimensions {
  height: number;
  length: number;
  unit: DimensionsUnit;
  width: number;
}

export enum DimensionsUnit {
  Centimeter = 'CENTIMETER',
  Inch = 'INCH',
}

export interface Weight {
  unit: WeightUnit;
  value: number;
}

export enum WeightUnit {
  Gram = 'GRAM',
  Kilogram = 'KILOGRAM',
  Ounce = 'OUNCE',
  Pound = 'POUND',
}

export interface Shipment {
  carrierCode: CarrierCode;
  carrierid?: string;
  estimatedDelivery: string;
  shipmentid?: string;
}

export enum CarrierCode {
  AccessWorldwide = 'ACCESS WORLDWIDE',
  AmazonBuyShipping = 'AMAZON BUY SHIPPING',
  AmazonShippingUk = 'AMAZON SHIPPING UK',
  Apc = 'APC',
  Asendia = 'ASENDIA',
  AustraliaPost = 'AUSTRALIA POST',
  CanadaPost = 'CANADA POST',
  DhlEcommerce = 'DHL ECOMMERCE',
  DhlExpress = 'DHL EXPRESS',
  DhlExpressAustralia = 'DHL EXPRESS AUSTRALIA',
  DhlExpressCanada = 'DHL EXPRESS CANADA',
  DhlExpressUk = 'DHL EXPRESS UK',
  Dpd = 'DPD',
  Endicia = 'ENDICIA',
  Fedex = 'FEDEX',
  FedexUk = 'FEDEX UK',
  Firstmile = 'FIRSTMILE',
  Globegistics = 'GLOBEGISTICS',
  Imex = 'IMEX',
  Newgistics = 'NEWGISTICS',
  OnTrac = 'ON TRAC',
  PurolatorCanada = 'PUROLATOR CANADA',
  RoyalMail = 'ROYAL MAIL',
  RrDonnelley = 'RR DONNELLEY',
  Seko = 'SEKO',
  Sendle = 'SENDLE',
  Stamps = 'STAMPS.COM',
  UPS = 'UPS',
  Usps = 'USPS',
}
