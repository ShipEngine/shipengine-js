import { Country } from "../../enums";

export interface ShipmentId {
  shipmentId: string;
}

export interface Shipment {
  validateAddress: ValidateAddress;
  carrierId: string;
  serviceCode: string;
  externalOrderId: string;
  items: ShipmentItem[];
  taxIdentifiers: TaxIdentifier[];
  externalShipmentId: string;

  shipDate: Date;
  shipTo: ShippingAddress;
  shipFrom: ShippingAddress;
  wareHouseId: string;
  returnTo: ShippingAddress;
  confirmation: DeliveryConfirmation;

  customs: CustomInfo[];
  advancedOptions: AdvancedOptions;
  originType: OriginType;
  insuranceProvider: InsuranceProvider;
  orderSourceCode: OrderSourceCode | string;
  packages: Package[];
}

export interface ShipmentItem {
  name: string;
  salesOrderId: string;
  salesOrderItemId: string;
  quantity?: number;
  sku: string;
  externalOrderId: string;
  externalOrderItemId: string;
  asin: string;
  orderSourceCode: OrderSourceCode;
}

export interface TaxIdentifier {
  taxableEntityType: TaxableEntityType;
  identifierType: IdentifierType;
  issuingAuthority: Country | string;
  value: string;
}

export interface CustomInfo {
  contents: Contents;
  nonDelivery: NonDelivery;
  customItems: CustomItem[];
}

export interface CustomItem {
  description: string;
  quantity: number;
  value: {
    currency: Currency;
    amount: number;
  };
  harmonizedTariffCode: string;
  countryOfOrigin: Country;
  unitOfMeasure: string;
  sku: string;
  skuDescription: string;
}
export interface AdvancedOptions {
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

export interface Package {
  packageCode: PackageCode;
  weight: Weight;
  dimensions: Dimensions;
  insuredValue: {
    currency: Currency;
    amount: number;
  };
  labelMessages: LabelMessages;
  externalPackageId?: string;
}

export interface Dimensions {
  unit: string;
  length: number;
  width: number;
  height: number;
}

export interface LabelMessages {
  reference1: string;
  reference2: string;
  reference3: string;
}

export interface Weight {
  unit: string;
  value: number;
}

export interface ShippingAddress {
  addressResidentialIndicator: string;
  name: string;
  phone: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
}

export interface RateOptions {
  carrierIds: string[];
  packageTypes: string[];
  serviceCodes: string[];
  calculateTaAmount: boolean;
  preferredCurrency: Currency | string;
}

export type BillToAccount =
  | "bill_to_country_code"
  | "bill_to_party"
  | "bill_to_postal_code";

export type BillToParty = "recipient" | "third_party";

export type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";

export type Contents =
  | "merchandise"
  | "documents"
  | "gift"
  | "returned_goods"
  | "sample";

export type NonDelivery = "return_to_sender" | "treat_as_abandoned";

export type DeliveryConfirmation =
  | "none"
  | "delivery"
  | "signature"
  | "adult_signature"
  | "direct_signature"
  | "delivery_mailed";

export type InsuranceProvider =
  | "none"
  | "shipsurance"
  | "carrier"
  | "third_party";

export type OrderSourceCode =
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

export type OriginType = "pickup" | "drop_off";

export type PackageCode =
  | "thick_envelope"
  | "small_flat_rate_box"
  | "large_package";

export type PaymentType = "any" | "cash" | "cash_equivalent" | "none";

export type ShipmentStatus =
  | "pending"
  | "processing"
  | "label_purchased"
  | "cancelled";

export type TaxableEntityType = "shipper" | "recipient";

export type IdentifierType =
  | "vat"
  | "eori"
  | "ssn"
  | "ein"
  | "tin"
  | "ioss"
  | "pan"
  | "voec";

export type ValidateAddress =
  | "no_validation"
  | "validate_only"
  | "validate_and_clean";

export type ValidationStatus = "valid" | "invalid" | "has_warnings" | "unknown";
