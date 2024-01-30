export declare type Params = Label;
declare type Country = "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IR" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "ES" | "LK" | "SD" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "GB" | "US" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW";
declare type OrderSourceName = "amazon_ca" | "amazon_us" | "brightpearl" | "channel_advisor" | "cratejoy" | "ebay" | "etsy" | "jane" | "groupon_goods" | "magento" | "paypal" | "seller_active" | "shopify" | "stitch_labs" | "squarespace" | "three_dcart" | "tophatter" | "walmart" | "woo_commerce" | "volusion";
declare type TaxableEntityType = "shipper" | "recipient";
declare type IdentifierType = "vat" | "eori" | "ssn" | "ein" | "tin" | "ioss" | "pan" | "voec";
declare type AddressResidentialIndicator = "unknown" | "yes" | "no";
declare type DeliveryConfirmation = "none" | "delivery" | "signature" | "adult_signature" | "direct_signature" | "delivery_mailed";
declare type PackageContents = "merchandise" | "documents" | "gift" | "returned_goods" | "sample";
declare type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
declare type NonDelivery = "return_to_sender" | "treat_as_abandoned";
declare type BillToParty = "recipient" | "third_party";
declare type OriginType = "pickup" | "drop_off";
declare type CollectOnDeliveryPaymentType = "any" | "cash" | "cash_equivalent" | "none";
declare type InsuranceProvider = "none" | "shipsurance" | "carrier" | "third_party";
declare type LabelChargeEvent = "carrier_default" | "on_creation" | "on_carrier_acceptance";
declare type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";
declare type LabelDownloadType = "url" | "inline";
declare type LabelFormat = "pdf" | "png" | "zpl";
declare type DisplayScheme = "label" | "qr_code";
declare type LabelLayout = "4x6" | "letter";
declare type DimensionUnit = "inch" | "centimeter";
declare type WeightUnit = "pound" | "ounce" | "gram" | "kilogram";
/**
 * An input label to be purchased.
 */
interface Label {
    /**
     * The shipment information used to generate the label
     */
    shipment: Shipment;
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
     * Default: "validateAndClean"
     * Enum: "noValidation" "validateOnly" "validateAndClean"
     * The possible validate address values
     */
    validateAddress?: ValidateAddress;
    /**
     * Default: "url"
     * Enum: "url" "inline"
     * There are two different ways to download a label:
     */
    labelDownloadType?: LabelDownloadType;
    /**
     * The file format that you want the label to be in. We recommend pdf format because it is supported by all carriers, whereas some carriers do not support the png or zpl formats.
     */
    labelFormat?: LabelFormat;
    /**
     * The display format that the label should be shown in.
     */
    displayScheme?: DisplayScheme;
    /**
     * The layout (size) that you want the label to be in. The labelFormat determines which sizes are allowed. 4x6 is supported for all label formats, whereas letter (8.5" x 11") is only supported for pdf format.
     */
    labelLayout?: LabelLayout;
    /**
     * The label image resource that was used to create a custom label image.
     */
    labelImageId?: string;
}
interface Shipment {
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
    confirmation?: DeliveryConfirmation;
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
    insuranceProvider?: InsuranceProvider;
    /**
     * The order sources that are supported by ShipEngine
     */
    orderSourceCode?: OrderSourceName;
    /**
     * The packages in the shipment.
     */
    packages: Package[];
}
interface Package {
    packageCode?: string;
    weight: Weight;
    dimensions?: Dimensions;
    insuredValue?: MonetaryValue;
    labelMessages?: LabelMessages;
    externalPackageId?: string;
}
interface LabelMessages {
    reference1?: string;
    reference2?: string;
    reference3?: string;
}
interface Dimensions {
    unit: DimensionUnit;
    length: number;
    width: number;
    height: number;
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
    orderSourceCode?: OrderSourceName;
}
interface TaxIdentifier {
    taxableEntityType: TaxableEntityType;
    identifierType: IdentifierType;
    issuingAuthority: string;
    value: string;
}
interface Address {
    name?: string;
    phone?: string;
    companyName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    cityLocality?: string;
    stateProvince?: string;
    postalCode?: string;
    countryCode?: Country;
    addressResidentialIndicator?: AddressResidentialIndicator;
}
interface InternationalShipmentOptions {
    contents: PackageContents;
    nonDelivery: NonDelivery;
    customsItems?: CustomsItem[];
}
interface CustomsItem {
    quantity?: number;
    value?: MonetaryValue;
    harmonizedTariffCode?: string;
    countryOfOrigin?: Country;
    unitOfMeasure?: string;
    sku?: string;
    skuDescription?: string;
    description?: string;
}
interface MonetaryValue {
    currency: Currency;
    amount: number;
}
interface AdvancedShipmentOptions {
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
interface Weight {
    value: number;
    unit: WeightUnit;
}
interface CollectOnDelivery {
    paymentType?: CollectOnDeliveryPaymentType;
    paymentAmount?: PaymentAmount;
}
interface PaymentAmount {
    currency?: Currency;
    amount?: number;
}
export {};
