import {
  Country,
  ValidationMessageCode,
  ValidationMessageType,
} from "../enums";

/**
 * An input address to be validated.
 */
export interface Address {
  /**
   * The street address. If the street address is multiple lines, then pass an
   * array of lines (up to 3).
   */
  street: string | string[];

  /**
   * The ISO 3166 country code
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */
  country: Country;

  /**
   * The name of the sender or recipient at the address, if applicable.
   */
  name?: string;

  /**
   * The company name, if this is a business address.
   */
  company?: string;

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
  isResidential?: boolean;
}

/**
 * A normalized address that is returned by ShipEngine API.
 */
export interface NormalizedAddress {
  /**
   * The street address. Each string in the array is a separate line (up to 3).
   */
  street: string[];

  /**
   * The name of the sender or recipient at the address, if applicable.
   *
   * This field may be empty.
   */
  name: string;

  /**
   * The company name, if this is a known business address.
   *
   * This field may be empty.
   */
  company: string;

  /**
   * The phone number associated with this address, if any.
   *
   * This field may be empty.
   */
  phone: string;

  /**
   * The city or locality.
   */
  cityLocality: string;

  /**
   * The state or province.
   */
  stateProvince: string;

  /**
   * The postal code.
   */
  postalCode: string;

  /**
   * The ISO 3166 country code
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */
  country: Country;

  /**
   * Indicates whether the address is residential or commercial.
   * If unknown, this field will be undefined.
   */
  isResidential?: boolean;

  /**
   * Formats the address for logging or printing.
   */
  toString(): string;
}

/**
 * The result of validating an address, whether it's valid or not.
 */
export interface AddressValidationResult {
  /**
   * Indicates whether the address is valid
   */
  isValid: boolean;

  /**
   * The normalized form of the address. This will only be populated if the
   * address was valid (i.e. `isValid` is `true`).
   *
   * Addresses are normalized according to the normalization rules of the
   * country they're in.
   */
  normalizedAddress?: NormalizedAddress;

  /**
   * Messages about the address validation, such as corrections or invalid fields.
   */
  messages: AddressValidationMessage[];

  /**
   * Informational messages about the address validation, such as minor corrections.
   */
  readonly info: AddressValidationMessage[];

  /**
   * Warning messages about the address validation, such as major changes that
   * were made to the normalized address.
   */
  readonly warnings: AddressValidationMessage[];

  /**
   * Error messages about the address validation, such as invalid fields that
   * prevent the address from being fully validated.
   */
  readonly errors: AddressValidationMessage[];
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
  code: ValidationMessageCode;

  /**
   * The human-readable message.
   */
  message: string;
}
