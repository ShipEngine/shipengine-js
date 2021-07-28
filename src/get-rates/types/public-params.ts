export type Params = ShipmentParam & RateOptions;

interface ShipmentParam {
  shipmentId?: string;
  shipment?: Shipment;
}

interface Shipment {
  validateAddress?: ValidateAddress;
  carrierId: string;
  serviceCode: string;
  externalOrderId?: string;
  items?: ShipmentItem[];
  taxIdentifiers?: TaxIdentifier[];
  externalShipmentId?: string;

  shipDate?: Date;
  shipTo: ShippingAddress;
  shipFrom?: ShippingAddress;
  wareHouseId?: string;
  returnTo?: ShippingAddress;
  confirmation?: DeliveryConfirmation;

  customs?: CustomInfo;
  advancedOptions?: AdvancedOptions;
  originType?: OriginType;
  insuranceProvider?: InsuranceProvider;
  orderSourceCode?: OrderSourceCode;
  packages?: Package[];
}

interface ShipmentItem {
  name?: string;
  salesOrderId?: string;
  salesOrderItemId?: string;
  quantity?: number;
  sku?: string;
  externalOrderId?: string;
  externalOrderItemId?: string;
  asin?: string;
  orderSourceCode?: OrderSourceCode;
}

interface TaxIdentifier {
  taxableEntityType: TaxableEntityType;
  identifierType: IdentifierType;
  issuingAuthority: Country | string;
  value: string;
}

interface CustomInfo {
  contents: Contents;
  nonDelivery: NonDelivery;
  customsItems?: CustomItem[];
}

interface CustomItem {
  description?: string;
  quantity?: number;
  value?: {
    currency: Currency;
    amount: number;
  };
  harmonizedTariffCode?: string;
  countryOfOrigin?: Country;
  unitOfMeasure?: string;
  sku?: string;
  skuDescription?: string;
}
interface AdvancedOptions {
  billToAccount?: BillToAccount;
  billToCountryCode?: Country;
  billToParty?: BillToParty;
  billToPostalCode?: string;
  containsAlcohol?: boolean;
  deliveryDutyPaid?: boolean;
  dryIce?: boolean;
  dryIceWeight: {
    value: number;
    unit: "pound" | "ounce" | "gram" | "kilogram";
  };
  nonMachinable?: boolean;
  saturdayDelivery?: boolean;
  useUPSGroundFreightPricing?: boolean;
  freightClass?: string;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  originType?: OriginType;
  shipperRelease?: boolean;
  collectOnDelivery?: {
    paymentType: PaymentType;
    paymentAmount: {
      amount: number;
      currency: Currency;
    };
  };
}

interface Package {
  packageCode?: PackageCode;
  weight: Weight;
  dimensions?: Dimensions;
  insuredValue?: {
    currency: Currency;
    amount: number;
  };
  labelMessages?: LabelMessages;
  externalPackageId?: string;
}

interface Dimensions {
  unit: string;
  length: number;
  width: number;
  height: number;
}

interface LabelMessages {
  reference1: string;
  reference2: string;
  reference3: string;
}

interface Weight {
  unit: string;
  value: number;
}

interface ShippingAddress {
  name: string;
  phone: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: string;
}

interface RateOptions {
  rateOptions: {
    carrierIds: [string, ...string[]];
    packageTypes: string[];
    serviceCodes: string[];
    calculateTaxAmount: boolean;
    preferredCurrency: Currency | string;
  };
}

type BillToAccount =
  | "bill_to_country_code"
  | "bill_to_party"
  | "bill_to_postal_code";

type BillToParty = "recipient" | "third_party";

type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";

type Contents =
  | "merchandise"
  | "documents"
  | "gift"
  | "returned_goods"
  | "sample";

type NonDelivery = "return_to_sender" | "treat_as_abandoned";

type DeliveryConfirmation =
  | "none"
  | "delivery"
  | "signature"
  | "adult_signature"
  | "direct_signature"
  | "delivery_mailed";

type InsuranceProvider = "none" | "shipsurance" | "carrier" | "third_party";

type OrderSourceCode =
  | "amazon_ca"
  | "amazon_us"
  | "brightpearl"
  | "channel_advisor"
  | "cratejoy"
  | "ebay"
  | "etsy"
  | "jane"
  | "groupon_goods"
  | "magento"
  | "paypal"
  | "seller_active"
  | "shopify"
  | "stitch_labs"
  | "squarespace"
  | "three_dcart"
  | "tophatter"
  | "walmart"
  | "woo_commerce"
  | "volusion";

type OriginType = "pickup" | "drop_off";

type PackageCode = "thick_envelope" | "small_flat_rate_box" | "large_package";

type PaymentType = "any" | "cash" | "cash_equivalent" | "none";

type TaxableEntityType = "shipper" | "recipient";

type IdentifierType =
  | "vat"
  | "eori"
  | "ssn"
  | "ein"
  | "tin"
  | "ioss"
  | "pan"
  | "voec";

type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";

type Country =
  | "AF"
  | "AX"
  | "AL"
  | "DZ"
  | "AS"
  | "AD"
  | "AO"
  | "AI"
  | "AQ"
  | "AG"
  | "AR"
  | "AM"
  | "AW"
  | "AU"
  | "AT"
  | "AZ"
  | "BS"
  | "BH"
  | "BD"
  | "BB"
  | "BY"
  | "BE"
  | "BZ"
  | "BJ"
  | "BM"
  | "BT"
  | "BO"
  | "BA"
  | "BW"
  | "BV"
  | "BR"
  | "IO"
  | "BN"
  | "BG"
  | "BF"
  | "BI"
  | "KH"
  | "CM"
  | "CA"
  | "CV"
  | "KY"
  | "CF"
  | "TD"
  | "CL"
  | "CN"
  | "CX"
  | "CC"
  | "CO"
  | "KM"
  | "CG"
  | "CD"
  | "CK"
  | "CR"
  | "CI"
  | "HR"
  | "CU"
  | "CY"
  | "CZ"
  | "DK"
  | "DJ"
  | "DM"
  | "DO"
  | "EC"
  | "EG"
  | "SV"
  | "GQ"
  | "ER"
  | "EE"
  | "ET"
  | "FK"
  | "FO"
  | "FJ"
  | "FI"
  | "FR"
  | "GF"
  | "PF"
  | "TF"
  | "GA"
  | "GM"
  | "GE"
  | "DE"
  | "GH"
  | "GI"
  | "GR"
  | "GL"
  | "GD"
  | "GP"
  | "GU"
  | "GT"
  | "GG"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HM"
  | "VA"
  | "HN"
  | "HK"
  | "HU"
  | "IS"
  | "IN"
  | "ID"
  | "IR"
  | "IQ"
  | "IE"
  | "IM"
  | "IL"
  | "IT"
  | "JM"
  | "JP"
  | "JE"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KR"
  | "KW"
  | "KG"
  | "LA"
  | "LV"
  | "LB"
  | "LS"
  | "LR"
  | "LY"
  | "LI"
  | "LT"
  | "LU"
  | "MO"
  | "MK"
  | "MG"
  | "MW"
  | "MY"
  | "MV"
  | "ML"
  | "MT"
  | "MH"
  | "MQ"
  | "MR"
  | "MU"
  | "YT"
  | "MX"
  | "FM"
  | "MD"
  | "MC"
  | "MN"
  | "ME"
  | "MS"
  | "MA"
  | "MZ"
  | "MM"
  | "NA"
  | "NR"
  | "NP"
  | "NL"
  | "NC"
  | "NZ"
  | "NI"
  | "NE"
  | "NG"
  | "NU"
  | "NF"
  | "MP"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PS"
  | "PA"
  | "PG"
  | "PY"
  | "PE"
  | "PH"
  | "PN"
  | "PL"
  | "PT"
  | "PR"
  | "QA"
  | "RE"
  | "RO"
  | "RU"
  | "RW"
  | "BL"
  | "SH"
  | "KN"
  | "LC"
  | "MF"
  | "PM"
  | "VC"
  | "WS"
  | "SM"
  | "ST"
  | "SA"
  | "SN"
  | "RS"
  | "SC"
  | "SL"
  | "SG"
  | "SK"
  | "SI"
  | "SB"
  | "SO"
  | "ZA"
  | "GS"
  | "ES"
  | "LK"
  | "SD"
  | "SR"
  | "SJ"
  | "SZ"
  | "SE"
  | "CH"
  | "SY"
  | "TW"
  | "TJ"
  | "TZ"
  | "TH"
  | "TL"
  | "TG"
  | "TK"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TC"
  | "TV"
  | "UG"
  | "UA"
  | "AE"
  | "GB"
  | "US"
  | "UM"
  | "UY"
  | "UZ"
  | "VU"
  | "VE"
  | "VN"
  | "VG"
  | "VI"
  | "WF"
  | "EH"
  | "YE"
  | "ZM"
  | "ZW";
