import { Country } from "../../enums";

/**
 * An input address to be validated.
 */
export interface ValidateAddressParams {
  /**
   * The first line of the address.
   */
  addressLineOne: string;

  /**
   * The second line of the address.
   */
  addressLineTwo?: string;

  /**
   * The third line of the address.
   */
  addressLineThree?: string;

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
