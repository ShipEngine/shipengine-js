export declare type Result = Label;
declare type LabelStatus = "processing" | "completed" | "error" | "voided";
declare type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
declare type LabelChargeEvent = "carrier_default" | "on_creation" | "on_carrier_acceptance";
declare type LabelFormat = "pdf" | "png" | "zpl";
declare type DisplayScheme = "label" | "qr_code";
declare type LabelLayout = "4x6" | "letter";
declare type TrackingStatus = "unknown" | "in_transit" | "error" | "delivered";
declare type WeightUnit = "pound" | "ounce" | "gram" | "kilogram";
declare type DimensionUnit = "inch" | "centimeter";
interface Label {
    labelId: string;
    status: LabelStatus;
    shipmentId: string;
    shipDate: string;
    createdAt: string;
    shipmentCost: MonetaryValue;
    insuranceCost: MonetaryValue;
    trackingNumber: string;
    isReturnLabel: boolean;
    rmaNumber: string | null;
    isInternational: boolean;
    batchId: string;
    carrierId: string;
    chargeEvent: LabelChargeEvent;
    serviceCode: string;
    packageCode: string;
    voided: boolean;
    voidedAt: string;
    labelFormat: LabelFormat;
    displayScheme: DisplayScheme;
    labelLayout: LabelLayout;
    trackable: boolean;
    labelImageId: string | null;
    carrierCode: string;
    trackingStatus: TrackingStatus;
    labelDownload: LabelDownload;
    formDownload: Link | null;
    insuranceClaim: Link | null;
    packages: Package[];
}
interface MonetaryValue {
    currency: Currency;
    amount: number;
}
interface LabelDownload {
    href: string;
    pdf: string;
    png: string;
    zpl: string;
}
interface Link {
    href: string;
    type: string;
}
interface Package {
    packageCode: string;
    weight: Weight;
    dimensions: Dimensions;
    insuredValue: MonetaryValue;
    trackingNumber: string;
    labelMessages: LabelMessages;
    externalPackageId: string;
}
interface Weight {
    value: number;
    unit: WeightUnit;
}
interface Dimensions {
    unit: DimensionUnit;
    length: number;
    width: number;
    height: number;
}
interface LabelMessages {
    reference1: string | null;
    reference2: string | null;
    reference3: string | null;
}
export {};
