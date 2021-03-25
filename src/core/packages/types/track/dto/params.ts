export interface TrackPackageParamsDto {
  carrierCode?: CarrierCode;
  trackingNumber?: string;
  packageid?: string;
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
