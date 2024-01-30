export declare type Params = LabelWithoutShipment;
declare type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";
declare type LabelLayout = "4x6" | "letter";
declare type LabelFormat = "pdf" | "png" | "zpl";
declare type LabelDownloadType = "url" | "inline";
declare type DisplayScheme = "label" | "qr_code";
interface LabelWithoutShipment {
    validateAddress?: ValidateAddress;
    labelLayout?: LabelLayout;
    labelFormat?: LabelFormat;
    labelDownloadType?: LabelDownloadType;
    displayScheme?: DisplayScheme;
    rateId: string;
}
export {};
