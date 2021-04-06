import { Country } from "../enums";
import { NormalizedAddressDTO } from "../json-rpc";

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

export function normalizeAddress(
  address: NormalizedAddressDTO
): NormalizedAddress {
  return {
    street: address.street,
    name: address.name || "",
    company: address.company_name || "",
    phone: address.phone || "",
    cityLocality: address.city_locality,
    stateProvince: address.state_province,
    postalCode: address.postal_code,
    country: address.country_code,
    isResidential: address.residential || undefined,
    toString: formatAddress,
  };
}

/**
 * Formats the address for logging or printing.
 */
function formatAddress(this: NormalizedAddress): string {
  const address = [];
  this.company && address.push(this.company);
  address.push(...this.street);
  address.push(
    `${this.cityLocality}, ${this.stateProvince} ${this.postalCode}`
  );
  address.push(this.country);
  return address.join("\n");
}
