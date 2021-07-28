import { ErrorCode, ErrorSource, ErrorType } from "../..";
import { InsuranceProvider } from "../../create-label/types/private-request";

export type Result = RatesResults;

interface RatesResults {
  shipmentId: string;
  carrierId: string | null;
  serviceCode: string | null;
  externalOrderId: string | null;
  items: ShipmentItem[] | null;
  taxIdentifiers: TaxIdentifier[] | null;
  externalShipmentId: string | null;
  shipDate: string;
  createdAt: string;
  modifiedAt: string;
  shipmentStatus: ShipmentStatus;
  shipTo: ShippingAddress | null;
  shipFrom: ShippingAddress | null;
  warehouseId: string | null;
  returnTo: ShippingAddress;
  confirmation: DeliveryConfirmation;
  customs: {
    contents: Contents;
    nonDelivery: NonDelivery;
    customsItems: CustomItem[] | null;
  } | null;
  advancedOptions: AdvancedOptions;
  originType: OriginType | null;
  insuranceProvider: InsuranceProvider;
  tags: Array<{ name: string }>;
  orderSourceCode?: OrderSourceCode | string | null;
  packages: Package[];
  totalWeight: {
    value: number;
    unit: "pound" | "ounce" | "gram" | "kilogram";
  };
  rateResponse: {
    rates: Rate[] | null;
    invalidRates: Rate[] | null;
    rateRequestId: string | null;
    shipmentId: string | null;
    createdAt: string | null;
    status: "working" | "completed" | "partial" | "error" | null;
    errors: Error[] | null;
  };
}

interface Package {
  packageCode?: PackageCode | null;
  weight: Weight;
  dimensions: Dimensions | null;
  insuredValue: {
    currency: Currency;
    amount: number;
  } | null;
  labelMessages: LabelMessages | null;
  externalPackageId: string | null;
}

type PackageCode = "thick_envelope" | "small_flat_rate_box" | "large_package";
interface LabelMessages {
  reference1: string;
  reference2: string;
  reference3: string;
}

interface Dimensions {
  unit: string;
  length: number;
  width: number;
  height: number;
}
interface Weight {
  unit: string;
  value: number;
}

interface Error {
  errorSource: ErrorSource;
  errorType: ErrorType;
  errorCode: ErrorCode;
  message: string;
}
interface Rate {
  rateId: string;
  rateType: "check" | "shipment";
  carrierId: string;
  shippingAmount: MonetaryValue;
  insuranceAmount: MonetaryValue;
  confirmationAmount: MonetaryValue;
  otherAmount: MonetaryValue;
  taxAmount: MonetaryValue | null;
  zone: number;
  packageType: string;
  deliveryDays: number | null;
  guaranteedService: boolean;
  estimatedDeliveryDate: string | null;
  carrierDeliveryDays: string | null;
  shipDate: string | null;
  negotiatedRate: boolean;
  serviceType: string;
  serviceCode: string;
  trackable: boolean;
  carrierCode: string;
  carrierNickname: string;
  carrierFriendlyName: string;
  validationStatus: ValidationStatus;
  warningMessages: string[];
  errorMessages: string[];
}

interface MonetaryValue {
  currency: Currency;
  amount: number;
}

interface ShipmentItem {
  name: string | null;
  salesOrderId: string | null;
  salesOrderItemId: string | null;
  quantity: number | null;
  sku: string | null;
  externalOrderId: string | null;
  externalOrderItemId: string | null;
  asin: string | null;
  orderSourceCode: OrderSourceCode | null;
}

interface CustomItem {
  customsItemId: string;
  description: string | null;
  quantity: number | null;
  value: {
    currency: Currency;
    amount: number;
  } | null;
  harmonizedTariffCode: string | null;
  countryOfOrigin: Country | null;
  unitOfMeasure: string | null;
  sku: string | null;
  skuDescription: string | null;
}

interface AdvancedOptions {
  billToAccount: BillToAccount | null;
  billToCountryCode: Country | null;
  billToParty: BillToParty | null;
  billToPostalCode: string | null;
  containsAlcohol: boolean | null;
  deliveryDutyPaid: boolean | null;
  dryIce: boolean | null;
  dryIceWeight: {
    value: number;
    unit: "pound" | "ounce" | "gram" | "kilogram";
  } | null;
  nonMachinable: boolean | null;
  saturdayDelivery: boolean | null;
  useUPSGroundFreightPricing: boolean | null;
  freightClass: string | null;
  customField1: string | null;
  customField2: string | null;
  customField3: string | null;
  originType: OriginType | null;
  shipperRelease: boolean | null;
  collectOnDelivery: {
    paymentType: PaymentType | null;
    paymentAmount: {
      amount: number | null;
      currency: Currency | null;
    } | null;
  } | null;
}

type NonDelivery = "return_to_sender" | "treat_as_abandoned";
type OriginType = "pickup" | "drop_off";
type PaymentType = "any" | "cash" | "cash_equivalent" | "none";
type BillToAccount =
  | "bill_to_country_code"
  | "bill_to_party"
  | "bill_to_postal_code";
type BillToParty = "recipient" | "third_party";

type ValidationStatus = "valid" | "invalid" | "has_warnings" | "unknown";

type ShipmentStatus =
  | "pending"
  | "processing"
  | "label_purchased"
  | "cancelled";

type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";

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

interface TaxIdentifier {
  taxableEntityType: TaxableEntityType;
  identifierType: IdentifierType;
  issuingAuthority: Country | string;
  value: string;
}

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

interface ShippingAddress {
  name: string;
  phone: string;
  companyName: string | null;
  addressLine1: string;
  addressLine2: string | null;
  addressLine3: string | null;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: string;
}

type DeliveryConfirmation =
  | "none"
  | "delivery"
  | "signature"
  | "adult_signature"
  | "direct_signature"
  | "delivery_mailed";

type Contents =
  | "merchandise"
  | "documents"
  | "gift"
  | "returned_goods"
  | "sample";

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
