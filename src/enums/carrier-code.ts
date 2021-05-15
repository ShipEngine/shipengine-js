export enum CarrierCode {
<<<<<<< Updated upstream
  AccessWorldwide = "access_worldwide",
  AmazonBuyShipping = "amazon_buy_shipping",
  AmazonShippingUK = "amazon_shipping_uk",
  APC = "apc",
  Asendia = "asendia",
  AustraliaPost = "australia_post",
  CanadaPost = "canada_post",
  DHLEcommerce = "dhl_ecommerce",
  DHLExpress = "dhl_express",
  DHLExpressAustralia = "dhl_express_australia",
  DHLExpressCanada = "dhl_express_canada",
  DHLExpressUK = "dhl_express_uk",
  DPD = "dpd",
  Endicia = "endicia",
  FedEx = "fedex",
  FedExUK = "fedex_uk",
  FirstMile = "first_mile",
  Globegistics = "globgistics",
  Imex = "imex",
  Newgistics = "newgistics",
  OnTrac = "on_trac",
  PurolatorCanada = "purolator_canada",
  RoyalMail = "royal_mail",
  RRDonnelley = "rr_donnelley",
  Seko = "seko",
  Sendle = "sendle",
  StampsCom = "stamps_com",
  UPS = "ups",
  USPS = "usps",
=======
  /**
   * FedEx - Federal Express
   *
   * @link https://www.fedex.com/en-us/home.html
   */
  FEDEX = "fedex",

  /**
   * UPS - United Parcel Service
   *
   * @link https://www.ups.com/us/en/about/sites.page
   */
  UPS = "ups",

  /**
   * USPS - United State Postal Service
   *
   * @link https://www.stamps.com/
   */
  USPS = "stamps_com",
}

interface Carrier {
  name: string;
  code: string;
>>>>>>> Stashed changes
}
