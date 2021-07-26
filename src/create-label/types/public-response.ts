export type Response = Label;

type LabelStatus = "processing" | "completed" | "error" | "voided";
type Currency = "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
type LabelChargeEvent =
  | "carrier_default"
  | "on_creation"
  | "on_carrier_acceptance";
type LabelFormat = "pdf" | "png" | "zpl";
type DisplayScheme = "label" | "qr_code";
type LabelLayout = "4x6" | "letter";
type TrackingStatus = "unknown" | "in_transit" | "error" | "delivered";
type WeightUnit = "pound" | "ounce" | "gram" | "kilogram";
type DimensionUnit = "inch" | "centimeter";

interface Label {
  label_id?: string;
  status?: LabelStatus;
  shipment_id?: string;
  ship_date?: string;
  created_at?: string;
  shipment_cost?: MonetaryValue;
  insurance_cost?: MonetaryValue;
  tracking_number?: string;
  is_return_label?: boolean;
  rma_number?: string;
  is_international?: boolean;
  batch_id?: string;
  carrier_id?: string;
  charge_event?: LabelChargeEvent;
  service_code?: string;
  package_code?: string;
  voided?: boolean;
  voided_at?: string;
  label_format?: LabelFormat & string;
  display_scheme?: DisplayScheme & string;
  label_layout?: LabelLayout & string;
  trackable?: boolean;
  label_image_id?: string;
  carrier_code?: string;
  tracking_status?: TrackingStatus;
  label_download?: LabelDownload;
  form_download?: Link;
  insurance_claim?: Link;
  packages?: Package[];
}
interface MonetaryValue {
  currency: Currency;
  amount: number;
}

interface LabelDownload {
  href?: string;
  pdf?: string;
  png?: string;
  zpl?: string;
}

interface Link {
  href?: string;
  type?: string;
}

interface Package {
  package_code?: string;
  weight: Weight;
  dimensions?: Dimensions;
  insured_value?: MonetaryValue;
  tracking_number?: string;
  label_messages?: LabelMessages;
  external_package_id?: string;
}

interface Weight {
  value: number;
  unit: WeightUnit;
}

interface Dimensions {
  unit: DimensionUnit & string;
  length: number;
  width: number;
  height: number;
}

interface LabelMessages {
  reference1?: string;
  reference2?: string;
  reference3?: string;
}
