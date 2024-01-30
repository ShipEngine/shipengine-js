import { ErrorCode, ErrorSource, ErrorType } from "../..";
import { InsuranceProvider } from "../../create-label-from-shipment-details/types/private-request";
export declare type Result = RatesResults;
interface RatesResults {
    /**
     * A string that uniquely identifies the shipment
     */
    shipmentId: string;
    /**
     * The carrier account that is billed for the shipping charges
     */
    carrierId: string | null;
    /**
     * The carrier service used to ship the package
     */
    serviceCode: string | null;
    /**
     * ID that the Order Source assigned
     */
    externalOrderId: string | null;
    /**
     * Describe the packages included in this shipment as related to potential metadata that was imported from external order sources
     */
    items: ShipmentItem[] | null;
    /**
     * Tax identifiers
     */
    taxIdentifiers: TaxIdentifier[] | null;
    /**
     * You can optionally use this field to store your own identifier for this shipment.
     */
    externalShipmentId: string | null;
    /**
     * The date that the shipment was (or will be) shippped. ShipEngine will take the day of week into consideration.
     * For example, if the carrier does not operate on Sundays, then a package that would have shipped on Sunday will ship on Monday instead.
     */
    shipDate: string;
    /**
     * The date and time that the shipment was created in ShipEngine.
     */
    createdAt: string;
    /**
     * The date and time that the shipment was created or last modified.
     */
    modifiedAt: string;
    /**
     * The current status of the shipment
     */
    shipmentStatus: ShipmentStatus;
    /**
     * The recipient's mailing address
     */
    shipTo: ShippingAddress | null;
    /**
     * The shipment's origin address. If you frequently ship from the same location, consider creating a warehouse.
     * Then you can simply specify the warehouse_id rather than the complete address each time.
     */
    shipFrom: ShippingAddress | null;
    /**
     * The warehouse that the shipment is being shipped from. Either warehouse_id or ship_from must be specified.
     */
    warehouseId: string | null;
    /**
     * The return address for this shipment. Defaults to the ship_from address.
     */
    returnTo: ShippingAddress;
    /**
     * The type of delivery confirmation that is required for this shipment.
     */
    confirmation: DeliveryConfirmation;
    /**
     * Customs information. This is usually only needed for international shipments.
     */
    customs: {
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
        customsItems: CustomItem[] | null;
    } | null;
    /**
     * Advanced shipment options. These are entirely optional.
     */
    advancedOptions: AdvancedOptions;
    /**
     * Indicates if the package will be picked up or dropped off by the carrier
     */
    originType: OriginType | null;
    /**
     * The insurance provider to use for any insured packages in the shipment.
     */
    insuranceProvider: InsuranceProvider;
    /**
     * Arbitrary tags associated with this shipment. Tags can be used to categorize shipments, and shipments can be queried by their tags.
     */
    tags: Array<{
        name: string;
    }>;
    /**
     * The order sources that are supported by ShipEngine
     */
    orderSourceCode?: OrderSourceCode | string | null;
    /**
     * The packages in the shipment.
     */
    packages: Package[];
    /**
     * The combined weight of all packages in the shipment
     */
    totalWeight: {
        /**
         * The weight, in the specified unit
         */
        value: number;
        /**
         * The possible weight unit values
         */
        unit: "pound" | "ounce" | "gram" | "kilogram";
    };
    /**
     * The rates response
     */
    rateResponse: {
        /**
         * An array of shipment rates
         */
        rates: Rate[] | null;
        /**
         * An array of invalid shipment rates
         */
        invalidRates: Rate[] | null;
        /**
         * A string that uniquely identifies the rate request
         */
        rateRequestId: string | null;
        /**
         * A string that uniquely identifies the shipment
         */
        shipmentId: string | null;
        /**
         * When the rate was created
         */
        createdAt: string | null;
        /**
         * The possible rate response status values
         */
        status: "working" | "completed" | "partial" | "error" | null;
        errors: Error[] | null;
    };
}
interface Package {
    /**
     * The package type, such as thick_envelope, small_flat_rate_box, large_package, etc. The code package indicates a custom or unknown package type.
     */
    packageCode?: PackageCode | null;
    /**
     * The package weight
     */
    weight: Weight;
    /**
     * The package dimensions
     */
    dimensions: Dimensions | null;
    /**
     * The insured value of the package. Requires the insurance_provider field of the shipment to be set.
     */
    insuredValue: {
        currency: Currency;
        amount: number;
    } | null;
    /**
     * The tracking number for the package. The format depends on the carrier.
     */
    trackingNumber: string | null;
    /**
     * Custom messages to print on the shipping label for the package. These are typically used to print invoice numbers, product numbers, or other internal reference numbers.
     * Not all carriers support label messages. The number of lines and the maximum length of each line also varies by carrier.
     */
    labelMessages: LabelMessages | null;
    /**
     * An external package id.
     */
    externalPackageId: string | null;
}
declare type PackageCode = "thick_envelope" | "small_flat_rate_box" | "large_package";
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
interface Weight {
    /**
     * The possible weight unit values
     */
    unit: string;
    /**
     * The weight, in the specified unit
     */
    value: number;
}
interface Error {
    errorSource: ErrorSource;
    errorType: ErrorType;
    errorCode: ErrorCode;
    message: string;
}
interface Rate {
    /**
     * A string that uniquely identifies the rate
     */
    rateId: string;
    /**
     * The possible rate type values
     */
    rateType: "check" | "shipment";
    /**
     * A string that uniquely identifies the carrier
     */
    carrierId: string;
    /**
     * The shipping amount
     */
    shippingAmount: MonetaryValue;
    /**
     * The insurance amount
     */
    insuranceAmount: MonetaryValue;
    /**
     * The confirmation amount
     */
    confirmationAmount: MonetaryValue;
    /**
     * Any other charges associated with this rate
     */
    otherAmount: MonetaryValue;
    /**
     * Tariff and additional taxes associated with an international shipment.
     */
    taxAmount: MonetaryValue | null;
    /**
     * Certain carriers base their rates off of custom zones that vary depending upon the ship_to and ship_from location
     */
    zone: number;
    /**
     * Package type that this rate was estimated for
     */
    packageType: string;
    /**
     * The number of days estimated for delivery, this will show the actual delivery time if for example, the package gets shipped on a Friday
     */
    deliveryDays: number | null;
    /**
     * Indicates if the rate is guaranteed.
     */
    guaranteedService: boolean;
    /**
     * An ISO 8601 string that represents a date, but not a specific time. The value may contain a time component, but it will be set to 00:00:00 UTC by ShipEngine.
     */
    estimatedDeliveryDate: string | null;
    /**
     * The carrier delivery days
     */
    carrierDeliveryDays: string | null;
    /**
     * ship date
     */
    shipDate: string | null;
    /**
     * Indicates if the rates been negotiated
     */
    negotiatedRate: boolean;
    /**
     * service type
     */
    serviceType: string;
    /**
     * service code for the rate
     */
    serviceCode: string;
    /**
     * Indicates if the rate is trackable.
     */
    trackable: boolean;
    /**
     * carrier code
     */
    carrierCode: string;
    /**
     * carrier nickname
     */
    carrierNickname: string;
    /**
     * carrier friendly name
     */
    carrierFriendlyName: string;
    /**
     * The possible validation status values
     */
    validationStatus: ValidationStatus;
    /**
     * The warning messages
     */
    warningMessages: string[];
    /**
     * The error messages
     */
    errorMessages: string[];
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
    /**
     * A string that uniquely identifies the customs item
     */
    customsItemId: string;
    /**
     * A description of the item
     */
    description: string | null;
    /**
     * The quantity of this item in the shipment.
     */
    quantity: number | null;
    /**
     * The declared customs value of each item
     */
    value: MonetaryValue | null;
    /**
     * The Harmonized Tariff Code of this item.
     */
    harmonizedTariffCode: string | null;
    /**
     * The two-letter ISO 3166-1 country code where this item originated
     */
    countryOfOrigin: Country | null;
    unitOfMeasure: string | null;
    /**
     * The SKU (Stock Keeping Unit) of the customs item
     */
    sku: string | null;
    /**
     * Description of the Custom Item's SKU
     */
    skuDescription: string | null;
}
interface AdvancedOptions {
    /**
     * This field is used to bill shipping costs to a third party. This field must be used in conjunction with the bill_to_country_code, bill_to_party, and bill_to_postal_code fields.
     */
    billToAccount: BillToAccount | null;
    /**
     * The two-letter ISO 3166-1 country code of the third-party that is responsible for shipping costs.
     */
    billToCountryCode: Country | null;
    /**
     * Indicates whether to bill shipping costs to the recipient or to a third-party.
     * When billing to a third-party, the bill_to_account, bill_to_country_code, and bill_to_postal_code fields must also be set.
     */
    billToParty: BillToParty | null;
    /**
     * The postal code of the third-party that is responsible for shipping costs.
     */
    billToPostalCode: string | null;
    /**
     * Indicates that the shipment contains alcohol.
     */
    containsAlcohol: boolean | null;
    /**
     * Indicates that the shipper is paying the international delivery duties for this shipment. This option is supported by UPS, FedEx, and DHL Express.
     */
    deliveryDutyPaid: boolean | null;
    /**
     * Indicates if the shipment contain dry ice
     */
    dryIce: boolean | null;
    /**
     * The weight of the dry ice in the shipment
     */
    dryIceWeight: {
        value: number;
        unit: "pound" | "ounce" | "gram" | "kilogram";
    } | null;
    /**
     * Indicates that the package cannot be processed automatically because it is too large or irregularly shaped.
     * This is primarily for USPS shipments. See Section 1.2 of the USPS parcel standards for details.
     */
    nonMachinable: boolean | null;
    /**
     * Enables Saturday delivery, if supported by the carrier.
     */
    saturdayDelivery: boolean | null;
    /**
     * Whether to use UPS Ground Freight pricing. If enabled, then a freight_class must also be specified.
     */
    useUPSGroundFreightPricing: boolean | null;
    /**
     * The National Motor Freight Traffic Association freight class, such as "77.5", "110", or "250".
     */
    freightClass: string | null;
    /**
     * An arbitrary field that can be used to store information about the shipment.
     */
    customField1: string | null;
    /**
     * An arbitrary field that can be used to store information about the shipment.
     */
    customField2: string | null;
    /**
     * An arbitrary field that can be used to store information about the shipment.
     */
    customField3: string | null;
    /**
     * Indicates if the package will be picked up or dropped off by the carrier
     */
    originType: OriginType | null;
    shipperRelease: boolean | null;
    /**
     * Defer payment until package is delivered, instead of when it is ordered.
     */
    collectOnDelivery: {
        paymentType: PaymentType | null;
        paymentAmount: {
            amount: number | null;
            currency: Currency | null;
        } | null;
    } | null;
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
    companyName: string | null;
    /**
     * The first line of the street address. For some addresses, this may be the only line.
     * Other addresses may require 2 or 3 lines.
     */
    addressLine1: string;
    /**
     * The second line of the street address. For some addresses, this line may not be needed.
     */
    addressLine2: string | null;
    /**
     * The third line of the street address. For some addresses, this line may not be needed.
     */
    addressLine3: string | null;
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
    addressResidentialIndicator: string;
}
declare type NonDelivery = "return_to_sender" | "treat_as_abandoned";
declare type OriginType = "pickup" | "drop_off";
declare type PaymentType = "any" | "cash" | "cash_equivalent" | "none";
declare type BillToAccount = "bill_to_country_code" | "bill_to_party" | "bill_to_postal_code";
declare type BillToParty = "recipient" | "third_party";
declare type ValidationStatus = "valid" | "invalid" | "has_warnings" | "unknown";
declare type ShipmentStatus = "pending" | "processing" | "label_purchased" | "cancelled";
declare type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
declare type OrderSourceCode = "amazon_ca" | "amazon_us" | "brightpearl" | "channel_advisor" | "cratejoy" | "ebay" | "etsy" | "jane" | "groupon_goods" | "magento" | "paypal" | "seller_active" | "shopify" | "stitch_labs" | "squarespace" | "three_dcart" | "tophatter" | "walmart" | "woo_commerce" | "volusion";
interface TaxIdentifier {
    taxableEntityType: TaxableEntityType;
    identifierType: IdentifierType;
    issuingAuthority: Country | string;
    value: string;
}
declare type TaxableEntityType = "shipper" | "recipient";
declare type IdentifierType = "vat" | "eori" | "ssn" | "ein" | "tin" | "ioss" | "pan" | "voec";
declare type DeliveryConfirmation = "none" | "delivery" | "signature" | "adult_signature" | "direct_signature" | "delivery_mailed";
declare type Contents = "merchandise" | "documents" | "gift" | "returned_goods" | "sample";
declare type Country = "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IR" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "ES" | "LK" | "SD" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "GB" | "US" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW";
export {};
