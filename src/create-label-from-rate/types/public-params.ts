export type Params = LabelWithoutShipment;

type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";
type LabelLayout = "4x6" | "letter";
type LabelFormat = "pdf" | "png" | "zpl";
type LabelDownloadType = "url" | "inline";
type DisplayScheme = "label" | "qr_code";

interface LabelWithoutShipment {
  validateAddress?: ValidateAddress;
  labelLayout?: LabelLayout;
  labelFormat?: LabelFormat;
  labelDownloadType?: LabelDownloadType;
  displayScheme?: DisplayScheme;
  rateId: string;
}
