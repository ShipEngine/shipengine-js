// generated from https://app.quicktype.io/ -- do not edit by hand
// To parse this data:
//
//   import { Convert, TrackPackageParamsDto } from "./file";
//
//   const trackPackageParamsDto = Convert.toTrackPackageParamsDto(json);

export interface TrackPackageParamsDto {
  carrier_code?: CarrierCode;
  tracking_number?: string;
  package_id?: string;
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
  StampsCOM = 'STAMPS.COM',
  UPS = 'UPS',
  Usps = 'USPS',
}
