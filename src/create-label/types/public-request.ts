export type Params = Label;

export type OrderSourceName =
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
export type AddressResidentialIndicator = "unknown" | "yes" | "no";
export type DeliveryConfirmation =
  | "none"
  | "delivery"
  | "signature"
  | "adult_signature"
  | "direct_signature"
  | "delivery_mailed";
export type PackageContents =
  | "merchandise"
  | "documents"
  | "gift"
  | "returned_goods"
  | "sample";
export type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
export type NonDelivery = "return_to_sender" | "treat_as_abandoned";
export type BillToParty = "recipient" | "third_party";
export type OriginType = "pickup" | "drop_off";
export type CollectOnDeliveryPaymentType =
  | "any"
  | "cash"
  | "cash_equivalent"
  | "none";
export type InsuranceProvider =
  | "none"
  | "shipsurance"
  | "carrier"
  | "third_party";
export type LabelChargeEvent =
  | "carrier_default"
  | "on_creation"
  | "on_carrier_acceptance";
export type ValidateAddress =
  | "no_validation"
  | "validate_only"
  | "validate_and_clean";
export type LabelDownloadType = "url" | "inline";
export type LabelFormat = "pdf" | "png" | "zpl";
export type DisplayScheme = "label" | "qr_code";
export type LabelLayout = "4x6" | "letter";
export type DimensionUnit = "inch" | "centimeter";
export type WeightUnit = "pound" | "ounce" | "gram" | "kilogram";

/**
 * An input label to be purchased.
 */
export interface Label {
  /**
   * The shipment information used to generate the label
   */
  shipment?: Shipment;

  /**
   * Indicates whether this is a return label. You may also want to set the rmaNumber so you know what is being returned.
   */
  isReturnLabel?: boolean;

  /**
   * An optional Return Merchandise Authorization number. This field is useful for return labels. You can set it to any string value.
   */
  rmaNumber?: string;

  /**
   * Enum: "carrierDefault" "onCreation" "onCarrierAcceptance". The label charge event.
   */
  chargeEvent?: LabelChargeEvent;

  /**
   * The labelId of the original (outgoing) label that the return label is for. This associates the two labels together, which is required by some carriers.
   */
  outboundLabelId?: string;

  /**
   * Indicate if this label is being used only for testing purposes. If true, then no charge will be added to your account.
   */
  testLabel?: boolean;

  /**
   * Default: "validateAndClean"
   * Enum: "noValidation" "validateOnly" "validateAndClean"
   * The possible validate address values
   */
  validateAddress?: ValidateAddress & string;

  /**
   * Default: "url"
   * Enum: "url" "inline"
   * There are two different ways to download a label:
   */
  labelDownloadType?: LabelDownloadType & string;

  /**
   * The file format that you want the label to be in. We recommend pdf format because it is supported by all carriers, whereas some carriers do not support the png or zpl formats.
   */
  labelFormat?: LabelFormat & string;

  /**
   * The display format that the label should be shown in.
   */
  displayScheme?: DisplayScheme & string;

  /**
   * The layout (size) that you want the label to be in. The labelFormat determines which sizes are allowed. 4x6 is supported for all label formats, whereas letter (8.5" x 11") is only supported for pdf format.
   */
  labelLayout?: LabelLayout & string;

  /**
   * The label image resource that was used to create a custom label image.
   */
  labelImageId?: string;
}

export interface Shipment {
  /**
   * The carrier account that is billed for the shipping charges
   */
  carrierId: string;

  /**
   * The carrier service used to ship the package, such as fedexGround, uspsFirstClassMail, flatRateEnvelope, etc.
   */
  serviceCode: string;

  /**
   * ID that the Order Source assigned
   */
  externalOrderId?: string;

  /**
   * Describe the packages included in this shipment as related to potential metadata that was imported from external order sources
   */
  items?: ShipmentItem[];

  /**
   * Array of tax identifiers
   */
  taxIdentifiers?: TaxIdentifier[];

  /**
   * You can optionally use this field to store your own identifier for this shipment.
   */
  externalShipmentId?: string;

  /**
   * The date that the shipment was(or will be) shipped. ShipEngine will take the day of week into consideration.For example, if the carrier does not operate on Sundays, then a package that would have shipped on Sunday will ship on Monday instead.
   */
  shipDate: string;

  /**
   * The recipient's mailing address
   */
  shipTo?: Address;

  /**
   * The shipment's origin address. If you frequently ship from the same location, consider creating a warehouse. Then you can simply specify the warehouseId rather than the complete address each time.
   */
  shipFrom?: Address;

  /**
   * The warehouse that the shipment is being shipped from. Either warehouseId or shipFrom must be specified.
   */
  warehouseId?: string;

  /**
   * The return address for this shipment. Defaults to the shipFrom address.
   */
  returnTo?: Address;

  /**
   * The type of delivery confirmation that is required for this shipment.
   */
  confirmation?: DeliveryConfirmation & string;

  /**
   * Customs information. This is usually only needed for international shipments.
   */
  customs?: InternationalShipmentOptions;

  /**
   * Advanced shipment options. These are entirely optional.
   */
  advancedOptions?: AdvancedShipmentOptions;

  /**
   * Indicates if the package will be picked up or dropped off by the carrier
   */
  originType?: OriginType;

  /**
   * The insurance provider to use for any insured packages in the shipment
   */
  insuranceProvider?: InsuranceProvider & string;

  /**
   * The order sources that are supported by ShipEngine
   */
  orderSourceCode?: OrderSourceName;

  /**
   * The packages in the shipment.
   */
  packages: Package[];
}

export interface Package {
  packageCode?: string;
  weight: Weight;
  dimensions?: Dimensions;
  insuredValue?: MonetaryValue;
  labelMessages?: LabelMessages;
  externalPackageId?: string;
}

export interface LabelMessages {
  reference1?: string;
  reference2?: string;
  reference3?: string;
}

export interface Dimensions {
  unit: DimensionUnit;
  length: number;
  width: number;
  height: number;
}

export interface ShipmentItem {
  name?: string;
  salesOrderId?: string;
  salesOrderItemId?: string;
  quantity?: number;
  sku?: string;
  externalOrderId?: string;
  externalOrderItemId?: string;
  asin?: string;
  orderSourceCode?: OrderSourceName;
}
export interface TaxIdentifier {
  taxableEntityType: TaxableEntityType;
  identifierType: IdentifierType;
  issuingAuthority: string;
  value: string;
}
export interface Address {
  name?: string;
  phone?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  cityLocality?: string;
  stateProvince?: string;
  postalCode?: string;
  countryCode?: string;
  addressResidentialIndicator?: AddressResidentialIndicator & string;
}

export interface InternationalShipmentOptions {
  contents: PackageContents & string;
  nonDelivery: NonDelivery & string;
  customsItems?: CustomsItem[];
}
export interface CustomsItem {
  quantity?: number;
  value?: MonetaryValue;
  harmonizedTariffCode?: string;
  countryOfOrigin?: string;
  unitOfMeasure?: string;
  sku?: string;
  skuDescription?: string;
}
export interface MonetaryValue {
  currency: Currency;
  amount: number;
}
export interface AdvancedShipmentOptions {
  billToAccount?: string;
  billToCountryCode?: string;
  billToParty?: BillToParty;
  billToPostalCode?: string;
  containsAlcohol?: boolean;
  deliveredDutyPaid?: boolean;
  dryIce?: boolean;
  dryIceWeight?: Weight;
  nonMachinable?: boolean;
  saturdayDelivery?: boolean;
  useUpsGroundFreightPricing?: boolean;
  freightClass?: string;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  originType?: OriginType;
  shipperRelease?: boolean;
  collectOnDelivery?: CollectOnDelivery;
}
export interface Weight {
  value: number;
  unit: WeightUnit;
}
export interface CollectOnDelivery {
  paymentType?: CollectOnDeliveryPaymentType;
  paymentAmount?: PaymentAmount;
  [k: string]: unknown;
}

export interface PaymentAmount {
  currency?: Currency;
  amount?: number;
  [k: string]: unknown;
}
