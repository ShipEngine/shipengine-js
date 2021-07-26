import { DimensionUnit } from "../../enums";

/**
 * The listCarrierAccounts response
 */
export type Response = Carrier[];

/**
 * The carrier object
 */
export interface Carrier {
  /**
   * The carrier ID
   */
  carrierId: string;
  /**
   * The code associated with the carrier
   */
  carrierCode: string;
  /**
   * The ShipEngine account number connected to this carrier
   */
  accountNumber: string;
  /**
   * Flag indicating if carrier requires funding
   */
  requiresFundedAmount?: boolean;
  /**
   * The carrier account balance
   */
  balance?: number;
  /**
   * The carrier account nickname
   */
  nickname?: string;
  /**
   * The carrier account friendly name
   */
  friendlyName?: string;
  /**
   * Flag indicating if this is the primary account
   */
  primary?: boolean;
  /**
   * Flag indicating if the carrier supports multi package shipments
   */
  hasMultiPackageSupportingServices?: boolean;
  /**
   * Flag indicating if the carrier supports label messages
   */
  supportsLabelMessages?: boolean;
  /**
   * Array of supported carrier services
   */
  services?: Service[];
  /**
   * Array of supported package types
   */
  packages?: PackageType[];
  /**
   * Array of supported advanced options
   */
  options?: AdvancedOption[];
}

/**
 * The carrier service object
 */
export interface Service {
  /**
   * The carrier ID
   */
  carrierId?: string;
  /**
   * The code associated with the carrier for this service
   */
  carrierCode?: string;
  /**
   * The code associated with the service
   */
  serviceCode?: string;
  /**
   * The name of the service
   */
  name?: string;
  /**
   * Flag indicating if the service is domestic
   */
  domestic?: boolean;
  /**
   * Flag indicating if the service is international
   */
  international?: boolean;
  /**
   * Flag indicating if the service supports multi package shipments
   */
  isMultiPackageSupported?: boolean;
}

/**
 * The package type object
 */
export interface PackageType {
  /**
   * The package type ID
   */
  packageId?: string;
  /**
   * The package type code
   */
  packageCode: string;
  /**
   * The package type name
   */
  name: string;
  /**
   * The package type dimensions
   */
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
 * The carrier advanced option object
 */
export interface AdvancedOption {
  name?: string;
  defaultValue?: string;
}
