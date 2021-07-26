export type Params = Label;

type OrderSourceName =
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

type AddressResidentialIndicator = "unknown" | "yes" | "no";

type DeliveryConfirmation =
  | "none"
  | "delivery"
  | "signature"
  | "adult_signature"
  | "direct_signature"
  | "delivery_mailed";

type PackageContents =
  | "merchandise"
  | "documents"
  | "gift"
  | "returned_goods"
  | "sample";

type NonDelivery = "return_to_sender" | "treat_as_abandoned";

type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";

type BillToParty = "recipient" | "third_party";

type WeightUnit = "pound" | "ounce" | "gram" | "kilogram";

type OriginType = "pickup" | "drop_off";

type CollectOnDeliveryPaymentType = "any" | "cash" | "cash_equivalent" | "none";

type InsuranceProvider = "none" | "shipsurance" | "carrier" | "third_party";

type LabelChargeEvent =
  | "carrier_default"
  | "on_creation"
  | "on_carrier_acceptance";

type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";

type LabelDownloadType = "url" | "inline";

type LabelFormat = "pdf" | "png" | "zpl";

type DisplayScheme = "label" | "qr_code";

type LabelLayout = "4x6" | "letter";

/**
 * An input label to be purchased.
 */
interface Label {
  /**
   * The shipment information used to generate the label
   */
  shipment?: Shipment;

  /**
   * Indicates whether this is a return label. You may also want to set the rma_number so you know what is being returned.
   */
  is_return_label?: boolean;

  /**
   * An optional Return Merchandise Authorization number. This field is useful for return labels. You can set it to any string value.
   */
  rma_number?: string;

  /**
   * Enum: "carrier_default" "on_creation" "on_carrier_acceptance". The label charge event.
   */
  charge_event?: LabelChargeEvent;

  /**
   * The label_id of the original (outgoing) label that the return label is for. This associates the two labels together, which is required by some carriers.
   */
  outbound_label_id?: string;

  /**
   * Indicate if this label is being used only for testing purposes. If true, then no charge will be added to your account.
   */
  test_label?: boolean;

  /**
   * Default: "validate_and_clean"
   * Enum: "no_validation" "validate_only" "validate_and_clean"
   * The possible validate address values
   */
  validate_address?: ValidateAddress & string;

  /**
   * Default: "url"
   * Enum: "url" "inline"
   * There are two different ways to download a label:
   */
  label_download_type?: LabelDownloadType & string;

  /**
   * The file format that you want the label to be in. We recommend pdf format because it is supported by all carriers, whereas some carriers do not support the png or zpl formats.
   */
  label_format?: LabelFormat & string;

  /**
   * The display format that the label should be shown in.
   */
  display_scheme?: DisplayScheme & string;

  /**
   * The layout (size) that you want the label to be in. The label_format determines which sizes are allowed. 4x6 is supported for all label formats, whereas letter (8.5" x 11") is only supported for pdf format.
   */
  label_layout?: LabelLayout & string;

  /**
   * The label image resource that was used to create a custom label image.
   */
  label_image_id?: string;
}

export interface Shipment {
  /**
   * The carrier account that is billed for the shipping charges
   */
  carrier_id: string;

  /**
   * The carrier service used to ship the package, such as fedex_ground, usps_first_class_mail, flat_rate_envelope, etc.
   */
  service_code: string;

  /**
   * ID that the Order Source assigned
   */
  external_order_id?: string;

  /**
   * Describe the packages included in this shipment as related to potential metadata that was imported from external order sources
   */
  items?: ShipmentItem[];

  /**
   * Array of tax identifiers
   */
  tax_identifiers?: TaxIdentifier[];

  /**
   * You can optionally use this field to store your own identifier for this shipment.
   */
  external_shipment_id?: string;

  /**
   * The date that the shipment was(or will be) shippped.ShipEngine will take the day of week into consideration.For example, if the carrier does not operate on Sundays, then a package that would have shipped on Sunday will ship on Monday instead.
   */
  ship_date: string;

  /**
   * The recipient's mailing address
   */
  ship_to?: Address;

  /**
   * The shipment's origin address. If you frequently ship from the same location, consider creating a warehouse. Then you can simply specify the warehouse_id rather than the complete address each time.
   */
  ship_from?: Address;

  /**
   * The warehouse that the shipment is being shipped from. Either warehouse_id or ship_from must be specified.
   */
  warehouse_id?: string;

  /**
   * The return address for this shipment. Defaults to the ship_from address.
   */
  return_to?: Address;

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
  advanced_options?: AdvancedShipmentOptions;

  /**
   * Indicates if the package will be picked up or dropped off by the carrier
   */
  origin_type?: OriginType;

  /**
   * The insurance provider to use for any insured packages in the shipment
   */
  insurance_provider?: InsuranceProvider & string;

  /**
   * The order sources that are supported by ShipEngine
   */
  order_source_code?: OrderSourceName;

  /**
   * The packages in the shipment.
   */
  packages: Package[];
}

export interface Package {
  package_code?: string;
  weight: Weight;
  dimensions?: Dimensions;
  insured_value?: MonetaryValue;
  label_messages?: LabelMessages;
  external_package_id?: string;
}

export interface LabelMessages {
  reference1?: string;
  reference2?: string;
  reference3?: string;
}

export interface Dimensions {
  unit: "inch" | "centimeter";
  length: number;
  width: number;
  height: number;
}

interface ShipmentItem {
  name?: string;
  sales_order_id?: string;
  sales_order_item_id?: string;
  quantity?: number;
  sku?: string;
  external_order_id?: string;
  external_order_item_id?: string;
  asin?: string;
  order_source_code?: OrderSourceName;
}
interface TaxIdentifier {
  taxable_entity_type: TaxableEntityType;
  identifier_type: IdentifierType;
  issuing_authority: string;
  value: string;
}
interface Address {
  name?: string;
  phone?: string;
  company_name?: string;
  address_line1?: string;
  address_line2?: string;
  address_line3?: string;
  city_locality?: string;
  state_province?: string;
  postal_code?: string;
  country_code?: string;
  address_residential_indicator?: AddressResidentialIndicator & string;
}

interface InternationalShipmentOptions {
  contents: PackageContents & string;
  non_delivery: NonDelivery & string;
  customs_items?: CustomsItem[];
}
interface CustomsItem {
  quantity?: number;
  value?: MonetaryValue;
  harmonized_tariff_code?: string;
  country_of_origin?: string;
  unit_of_measure?: string;
  sku?: string;
  sku_description?: string;
}
interface MonetaryValue {
  currency: Currency;
  amount: number;
}
interface AdvancedShipmentOptions {
  bill_to_account?: string;
  bill_to_country_code?: string;
  bill_to_party?: BillToParty;
  bill_to_postal_code?: string;
  contains_alcohol?: boolean;
  delivered_duty_paid?: boolean;
  dry_ice?: boolean;
  dry_ice_weight?: Weight;
  non_machinable?: boolean;
  saturday_delivery?: boolean;
  use_ups_ground_freight_pricing?: boolean;
  freight_class?: string;
  custom_field1?: string;
  custom_field2?: string;
  custom_field3?: string;
  origin_type?: OriginType;
  shipper_release?: boolean;
  collect_on_delivery?: CollectOnDelivery;
}
interface Weight {
  value: number;
  unit: WeightUnit;
}
interface CollectOnDelivery {
  payment_type?: CollectOnDeliveryPaymentType;
  payment_amount?: PaymentAmount;
  [k: string]: unknown;
}

export interface PaymentAmount {
  currency?: Currency;
  amount?: number;
  [k: string]: unknown;
}
