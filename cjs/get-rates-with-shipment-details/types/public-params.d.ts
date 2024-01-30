export declare type Params = ShipmentParam & RateOptions;
interface ShipmentParam {
    shipmentId?: string;
    shipment?: Shipment;
}
/**
 * The shipment object
 */
interface Shipment {
    /**
     * The possible validate address values
     */
    validateAddress?: ValidateAddress;
    /**
     * The carrier account that is billed for the shipping charges
     */
    carrierId?: string;
    /**
     * The carrier service used to ship the package, such as fedex_ground, usps_first_class_mail, flat_rate_envelope, etc.
     */
    serviceCode?: string;
    /**
     * ID that the Order Source assigned
     */
    externalOrderId?: string;
    /**
     * Describe the packages included in this shipment as related to potential metadata that was imported from external order sources
     */
    items?: ShipmentItem[];
    taxIdentifiers?: TaxIdentifier[];
    /**
     * You can optionally use this field to store your own identifier for this shipment.
     */
    externalShipmentId?: string;
    /**
     * The date that the shipment was (or will be) shippped. ShipEngine will take the day of week into consideration.
     * For example, if the carrier does not operate on Sundays, then a package that would have shipped on Sunday will ship on Monday instead.
     */
    shipDate?: Date;
    /**
     * The recipient's mailing address
     */
    shipTo: ShippingAddress;
    /**
     * The shipment's origin address. If you frequently ship from the same location, consider creating a warehouse.
     * Then you can simply specify the warehouse_id rather than the complete address each time.
     */
    shipFrom?: ShippingAddress;
    /**
     * The warehouse that the shipment is being shipped from. Either warehouse_id or ship_from must be specified.
     */
    wareHouseId?: string;
    /**
     * The return address for this shipment. Defaults to the ship_from address.
     */
    returnTo?: ShippingAddress;
    /**
     * The type of delivery confirmation that is required for this shipment.
     */
    confirmation?: DeliveryConfirmation;
    /**
     * Customs information. This is usually only needed for international shipments.
     */
    customs?: CustomInfo;
    /**
     * Advanced shipment options. These are entirely optional.
     */
    advancedOptions?: AdvancedOptions;
    /**
     * Indicates if the package will be picked up or dropped off by the carrier
     */
    originType?: OriginType;
    /**
     * The insurance provider to use for any insured packages in the shipment.
     */
    insuranceProvider?: InsuranceProvider;
    /**
     * The order sources that are supported by ShipEngine
     */
    orderSourceCode?: OrderSourceCode;
    /**
     * The packages in the shipment.
     */
    packages: Package[];
}
interface ShipmentItem {
    /**
     * item name
     */
    name?: string;
    /**
     * sales order id
     */
    salesOrderId?: string;
    /**
     * sales order item id
     */
    salesOrderItemId?: string;
    /**
     * The quantity of this item included in the shipment
     */
    quantity?: number;
    /**
     * Item Stock Keeping Unit
     */
    sku?: string;
    /**
     * external order id
     */
    externalOrderId?: string;
    /**
     * external order item id
     */
    externalOrderItemId?: string;
    /**
     * Amazon Standard Identification Number
     */
    asin?: string;
    /**
     * The order sources that are supported by ShipEngine
     */
    orderSourceCode?: OrderSourceCode;
}
interface TaxIdentifier {
    /**
     * The taxable entity type for this tax item
     */
    taxableEntityType: TaxableEntityType;
    /**
     * Determines how FedEx will pickup your packages
     */
    identifierType: IdentifierType;
    /**
     * The authority that issued this tax. This must be a valid 2 character ISO 3166 Alpha 2 country code.
     */
    issuingAuthority: Country | string;
    /**
     * The value of the identifier
     */
    value: string;
}
interface CustomInfo {
    /**
     * The type of contents in this shipment. This may impact import duties or customs treatment.
     */
    contents: Contents;
    /**
     * Indicates what to do if a package is unable to be delivered.
     */
    nonDelivery: NonDelivery;
    /**
     * Customs declarations for each item in the shipment.
     */
    customsItems?: CustomItem[];
}
interface CustomItem {
    /**
     * A description of the item
     */
    description?: string;
    /**
     * The quantity of this item in the shipment.
     */
    quantity?: number;
    /**
     * The declared customs value of each item
     */
    value?: MonetaryValue;
    /**
     * The Harmonized Tariff Code of this item.
     */
    harmonizedTariffCode?: string;
    /**
     * The two-letter ISO 3166-1 country code where this item originated
     */
    countryOfOrigin?: Country;
    unitOfMeasure?: string;
    /**
     * The SKU (Stock Keeping Unit) of the customs item
     */
    sku?: string;
    /**
     * Description of the Custom Item's SKU
     */
    skuDescription?: string;
}
interface AdvancedOptions {
    /**
     * This field is used to bill shipping costs to a third party. This field must be used in conjunction with the bill_to_country_code, bill_to_party, and bill_to_postal_code fields.
     */
    billToAccount?: BillToAccount;
    /**
     * The two-letter ISO 3166-1 country code of the third-party that is responsible for shipping costs.
     */
    billToCountryCode?: Country;
    /**
     * Indicates whether to bill shipping costs to the recipient or to a third-party.
     * When billing to a third-party, the bill_to_account, bill_to_country_code, and bill_to_postal_code fields must also be set.
     */
    billToParty?: BillToParty;
    /**
     * The postal code of the third-party that is responsible for shipping costs.
     */
    billToPostalCode?: string;
    /**
     * Indicates that the shipment contains alcohol.
     */
    containsAlcohol?: boolean;
    /**
     * Indicates that the shipper is paying the international delivery duties for this shipment. This option is supported by UPS, FedEx, and DHL Express.
     */
    deliveryDutyPaid?: boolean;
    /**
     * Indicates if the shipment contain dry ice
     */
    dryIce?: boolean;
    /**
     * The weight of the dry ice in the shipment
     */
    dryIceWeight: {
        value: number;
        unit: "pound" | "ounce" | "gram" | "kilogram";
    };
    /**
     * Indicates that the package cannot be processed automatically because it is too large or irregularly shaped.
     * This is primarily for USPS shipments. See Section 1.2 of the USPS parcel standards for details.
     */
    nonMachinable?: boolean;
    /**
     * Enables Saturday delivery, if supported by the carrier.
     */
    saturdayDelivery?: boolean;
    /**
     * Whether to use UPS Ground Freight pricing. If enabled, then a freight_class must also be specified.
     */
    useUPSGroundFreightPricing?: boolean;
    /**
     * The National Motor Freight Traffic Association freight class, such as "77.5", "110", or "250".
     */
    freightClass?: string;
    /**
     * An arbitrary field that can be used to store information about the shipment.
     */
    customField1?: string;
    /**
     * An arbitrary field that can be used to store information about the shipment.
     */
    customField2?: string;
    /**
     * An arbitrary field that can be used to store information about the shipment.
     */
    customField3?: string;
    /**
     * Indicates if the package will be picked up or dropped off by the carrier
     */
    originType?: OriginType;
    shipperRelease?: boolean;
    /**
     * Defer payment until package is delivered, instead of when it is ordered.
     */
    collectOnDelivery?: {
        paymentType: PaymentType;
        paymentAmount: {
            amount: number;
            currency: Currency;
        };
    };
}
interface Package {
    /**
     * The package type, such as thick_envelope, small_flat_rate_box, large_package, etc. The code package indicates a custom or unknown package type.
     */
    packageCode?: PackageCode;
    /**
     * The package weight
     */
    weight: Weight;
    /**
     * The package dimensions
     */
    dimensions?: Dimensions;
    /**
     * The insured value of the package. Requires the insurance_provider field of the shipment to be set.
     */
    insuredValue?: MonetaryValue;
    /**
     * Custom messages to print on the shipping label for the package. These are typically used to print invoice numbers, product numbers, or other internal reference numbers.
     * Not all carriers support label messages. The number of lines and the maximum length of each line also varies by carrier.
     */
    labelMessages?: LabelMessages;
    /**
     * An external package id.
     */
    externalPackageId?: string;
}
interface Dimensions {
    /**
     * The dimension units that are supported by ShipEngine.
     */
    unit: string;
    /**
     * The length of the package, in the specified unit
     */
    length: number;
    /**
     * The width of the package, in the specified unit
     */
    width: number;
    /**
     * The height of the package, in the specified unit
     */
    height: number;
}
interface LabelMessages {
    /**
     * The first line of the custom label message. Some carriers may prefix this line with something like "REF", "Reference", "Trx Ref No.", etc.
     */
    reference1: string;
    /**
     * The second line of the custom label message. Some carriers may prefix this line with something like "INV", "Reference 2", "Trx Ref No.", etc.
     */
    reference2: string;
    /**
     * The third line of the custom label message. Some carriers may prefix this line with something like "PO", "Reference 3", etc.
     */
    reference3: string;
}
interface Weight {
    unit: string;
    value: number;
}
interface ShippingAddress {
    /**
     * The name of a contact person at this address.
     * This field may be set instead of - or in addition to - the company_name field.
     */
    name: string;
    /**
     * The phone number of a contact person at this address. The format of this phone number varies depending on the country.
     */
    phone: string;
    /**
     * If this is a business address, then the company name should be specified here.
     */
    companyName?: string;
    /**
     * The first line of the street address. For some addresses, this may be the only line.
     * Other addresses may require 2 or 3 lines.
     */
    addressLine1: string;
    /**
     * The second line of the street address. For some addresses, this line may not be needed.
     */
    addressLine2?: string;
    /**
     * The third line of the street address. For some addresses, this line may not be needed.
     */
    addressLine3?: string;
    /**
     * The name of the city or locality
     */
    cityLocality: string;
    /**
     * The state or province. For some countries (including the U.S.) only abbreviations are allowed.
     * Other countries allow the full name or abbreviation.
     */
    stateProvince: string;
    /**
     * postal code
     */
    postalCode: string;
    /**
     * The two-letter ISO 3166-1 country code
     */
    countryCode: string;
    /**
     * Indicates whether this is a residential address.
     */
    addressResidentialIndicator: "unknown" | "yes" | "no";
}
interface RateOptions {
    rateOptions: {
        carrierIds: string[];
        packageTypes?: string[];
        serviceCodes?: string[];
        calculateTaxAmount?: boolean;
        preferredCurrency?: Currency | string;
    };
}
interface MonetaryValue {
    /**
     * The currencies that are supported by ShipEngine.
     */
    currency: Currency;
    /**
     * The monetary amount, in the specified currency.
     */
    amount: number;
}
declare type BillToAccount = "bill_to_country_code" | "bill_to_party" | "bill_to_postal_code";
declare type BillToParty = "recipient" | "third_party";
declare type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
declare type Contents = "merchandise" | "documents" | "gift" | "returned_goods" | "sample";
declare type NonDelivery = "return_to_sender" | "treat_as_abandoned";
declare type DeliveryConfirmation = "none" | "delivery" | "signature" | "adult_signature" | "direct_signature" | "delivery_mailed";
declare type InsuranceProvider = "none" | "shipsurance" | "carrier" | "third_party";
declare type OrderSourceCode = "amazon_ca" | "amazon_us" | "brightpearl" | "channel_advisor" | "cratejoy" | "ebay" | "etsy" | "jane" | "groupon_goods" | "magento" | "paypal" | "seller_active" | "shopify" | "stitch_labs" | "squarespace" | "three_dcart" | "tophatter" | "walmart" | "woo_commerce" | "volusion";
declare type OriginType = "pickup" | "drop_off";
declare type PackageCode = "thick_envelope" | "small_flat_rate_box" | "large_package";
declare type PaymentType = "any" | "cash" | "cash_equivalent" | "none";
declare type TaxableEntityType = "shipper" | "recipient";
declare type IdentifierType = "vat" | "eori" | "ssn" | "ein" | "tin" | "ioss" | "pan" | "voec";
declare type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";
declare type Country = "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IR" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "ES" | "LK" | "SD" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "GB" | "US" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW";
export {};
