import { Country, ValidationMessageType } from "../../enums";
import { ValidationMessageCode } from "../../constants";

export type Params = Address[];

/**
 * An input address to be validated.
 */
export interface Address {
  /**
   * The first line of the address.
   */
  addressLine1?: string;

  /**
   * The second line of the address.
   */
  addressLine2?: string;

  /**
   * The third line of the address.
   */
  addressLine3?: string;

  /**
   * The ISO 3166 country code
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */
  countryCode: Country;

  /**
   * The name of the sender or recipient at the address, if applicable.
   */
  name?: string;

  /**
   * The company name, if this is a business address.
   */
  companyName?: string;

  /**
   * The phone number associated with this address, if any.
   */
  phone?: string;

  /**
   * The city or locality
   */
  cityLocality?: string;

  /**
   * The state or province
   */
  stateProvince?: string;

  /**
   * The postal code
   */
  postalCode?: string;

  /**
   * Indicates whether the address is residential or commercial, if known.
   */
  addressResidentialIndicator?: "unknown" | "yes" | "no";
}

export type Response = AddressValidationResult[];

/**
 * The result of validating an address, whether it's valid or not.
 */
export interface AddressValidationResult {
  /**
   * Indicates whether the address has been verified
   */
  status: "unverified" | "verified" | "warning" | "error";

  /**
   * The address given to be validated
   */
  originalAddress: Address;

  /**
   * The normalized form of the address. This will only be populated if the
   * address was valid (i.e. `isValid` is `true`).
   *
   * Addresses are normalized according to the normalization rules of the
   * country they're in.
   */
  normalizedAddress?: Address;

  /**
   * Messages about the address validation, such as corrections or invalid fields.
   */
  messages: AddressValidationMessage[];
}

/**
 * A message about the address validation, such as a correction or an invalid field.
 */
export interface AddressValidationMessage {
  /**
   * Indicates whether this message is just informational, or a warning/error.
   */
  type: ValidationMessageType;

  /**
   * Indicates the specific validation message that was returned.
   */
  detailCode: ValidationMessageCode;

  /**
   * The human-readable message.
   */
  message: string;
}
