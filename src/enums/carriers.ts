export interface Carrier {
  name: string;
  code: string;
  URL: URL;
}

export enum Carriers {
  /**
   * FedEx - Federal Express
   *
   * @link https://www.fedex.com/en-us/home.html
   */
  FEDEX = {
    code: "fedex",
    name: "Federal Express",
    URL: "https://www.fedex.com/en-us/home.html",
  },

  /**
   * UPS - United Parcel Service
   *
   * @link https://www.ups.com/us/en/about/sites.page
   */
  UPS = {
    code: "ups",
    name: "United Parcel Service",
    URL: "https://www.ups.com/us/en/about/sites.page",
  },

  /**
   * USPS - United State Postal Service
   *
   * @link https://www.stamps.com/
   */
  USPS = {
    code: "stamps_com",
    name: "United States Postal Service",
    URL: "https://www.stamps.com/",
  },
}
