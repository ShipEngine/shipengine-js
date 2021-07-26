export type Response = Label;

export type LabelStatus = "processing" | "completed" | "error" | "voided";
export type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
export type LabelChargeEvent =
  | "carrier_default"
  | "on_creation"
  | "on_carrier_acceptance";
export type LabelFormat = "pdf" | "png" | "zpl";
export type DisplayScheme = "label" | "qr_code";
export type LabelLayout = "4x6" | "letter";
export type TrackingStatus = "unknown" | "in_transit" | "error" | "delivered";
export type WeightUnit = "pound" | "ounce" | "gram" | "kilogram";
export type DimensionUnit = "inch" | "centimeter";

export interface Label {
  labelId?: string;
  status?: LabelStatus;
  shipmentId?: string;
  shipDate?: string;
  createdAt?: string;
  shipmentCost?: MonetaryValue;
  insuranceCost?: MonetaryValue;
  trackingNumber?: string;
  isReturnLabel?: boolean;
  rmaNumber?: string;
  isInternational?: boolean;
  batchId?: string;
  carrierId?: string;
  chargeEvent?: LabelChargeEvent;
  serviceCode?: string;
  packageCode?: string;
  voided?: boolean;
  voidedAt?: string;
  labelFormat?: LabelFormat & string;
  displayScheme?: DisplayScheme & string;
  labelLayout?: LabelLayout & string;
  trackable?: boolean;
  labelImageId?: string;
  carrierCode?: string;
  trackingStatus?: TrackingStatus;
  labelDownload?: LabelDownload;
  formDownload?: Link;
  insuranceClaim?: Link;
  packages?: Package[];
}

export interface MonetaryValue {
  currency: Currency;
  amount: number;
}

export interface LabelDownload {
  href?: string;
  pdf?: string;
  png?: string;
  zpl?: string;
}

export interface Link {
  href?: string;
  type?: string;
}

export interface Package {
  packageCode?: string;
  weight: Weight;
  dimensions?: Dimensions;
  insuredValue?: MonetaryValue;
  trackingNumber?: string;
  labelMessages?: LabelMessages;
  externalPackageId?: string;
}

export interface Weight {
  value: number;
  unit: WeightUnit;
}

export interface Dimensions {
  unit: DimensionUnit & string;
  length: number;
  width: number;
  height: number;
}

export interface LabelMessages {
  reference1?: string;
  reference2?: string;
  reference3?: string;
}
