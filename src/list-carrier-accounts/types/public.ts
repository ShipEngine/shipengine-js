// import { ValidateAddressesTypes } from "../../validate-addresses";

/**
 * The listCarrierAccounts result
 */
export type Result = Carrier[];

/**
 * The carrier object
 */
interface Carrier {
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
  requiresFundedAmount: boolean | null;
  /**
   * The carrier account balance
   */
  balance: number | null;
  /**
   * The carrier account nickname
   */
  nickname: string | null;
  /**
   * The carrier account friendly name
   */
  friendlyName: string | null;
  /**
   * Flag indicating if this is the primary account
   */
  primary: boolean | null;
  /**
   * Flag indicating if the carrier supports multi package shipments
   */
  hasMultiPackageSupportingServices: boolean | null;
  /**
   * Flag indicating if the carrier supports label messages
   */
  supportsLabelMessages: boolean | null;
  /**
   * Array of supported carrier services
   */
  services: Service[];
  /**
   * Array of supported package types
   */
  packages: PackageType[];
  /**
   * Array of supported advanced options
   */
  options: AdvancedOption[];
}

/**
 * The carrier service object
 */
interface Service {
  /**
   * The carrier ID
   */
  carrierId: string | null;
  /**
   * The code associated with the carrier for this service
   */
  carrierCode: string | null;
  /**
   * The code associated with the service
   */
  serviceCode: string | null;
  /**
   * The name of the service
   */
  name: string | null;
  /**
   * Flag indicating if the service is domestic
   */
  domestic: boolean | null;
  /**
   * Flag indicating if the service is international
   */
  international: boolean | null;
  /**
   * Flag indicating if the service supports multi package shipments
   */
  isMultiPackageSupported: boolean | null;
}

/**
 * The package type object
 */
interface PackageType {
  /**
   * The package type ID
   */
  packageId: string | null;
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
  dimensions: Dimensions | null;
  description: string | null;
}

/**
 * The package dimensions object
 *
 * @see https://www.shipengine.com/docs/shipping/size-and-weight/
 */
interface Dimensions {
  unit: DimensionUnit;
  length: number;
  width: number;
  height: number;
}

type DimensionUnit = "in" | "cm";

/**
 * The carrier advanced option object
 */
interface AdvancedOption {
  name: string | null;
  defaultValue: string | null;
  description: string | null;
}
