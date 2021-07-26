import { DimensionUnit } from "../../enums";

/**
 * The listCarrierAccounts response
 */
export type Response = Carrier[];

/**
 * The carrier object
 */
export interface Carrier {
  carrierId: string;
  carrierCode: string;
  accountNumber: string;
  requiresFundedAmount?: boolean;
  balance?: number;
  nickname?: string;
  friendlyName?: string;
  primary?: boolean;
  hasMultiPackageSupportingServices?: boolean;
  supports_label_messages?: boolean;
  services?: Service[];
  packages?: Package[];
  options?: Options[];
}

/**
 * The carrier service object
 */
export interface Service {
  carrierId?: string;
  carrierCode?: string;
  serviceCode?: string;
  name?: string;
  domestic?: boolean;
  international?: boolean;
  isMultiPackageSupported?: boolean;
}

/**
 * The package type object
 */
export interface Package {
  packageId?: string;
  packageCode: string;
  name: string;
  dimensions?: Dimensions;
}

/**
 * The package dimensions object
 */
export interface Dimensions {
  unit: DimensionUnit;
  length?: number;
  width?: number;
  height?: number;
}

/**
 * The carrier options object
 */
export interface Options {
  name?: string;
  defaultValue?: string;
}
