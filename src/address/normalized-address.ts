import { Country } from "../types/country";
import { JsonRpcResultAddress } from "./dto";

/**
 * A normalized address that is returned by ShipEngine API.
 */
export class NormalizedAddress {
  /**
   * The street address. Each string in the array is a separate line (up to 3).
   */
  public street: string[];

  /**
   * The name of the sender or recipient at the address, if applicable.
   *
   * This field may be empty.
   */
  public name: string;

  /**
   * The company name, if this is a known business address.
   *
   * This field may be empty.
   */
  public company: string;

  /**
   * The phone number associated with this address, if any.
   *
   * This field may be empty.
   */
  public phone: string;

  /**
   * The city or locality.
   */
  public cityLocality: string;

  /**
   * The state or province.
   */
  public stateProvince: string;

  /**
   * The postal code.
   */
  public postalCode: string;

  /**
   * The ISO 3166 country code
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */
  public country: Country;

  /**
   * Indicates whether the address is residential or commercial.
   * If unknown, this field will be undefined.
   */
  public isResidential?: boolean;

  public constructor(address: JsonRpcResultAddress) {
    this.street = address.street;
    this.name = address.name || "";
    this.company = address.company_name || "";
    this.phone = address.phone || "";
    this.cityLocality = address.city_locality;
    this.stateProvince = address.state_province;
    this.postalCode = address.postal_code;
    this.country = address.country_code;
  }

  /**
   * Formats the address for logging or printing.
   */
  public toString(): string {
    const address = [];
    this.company && address.push(this.company);
    address.push(...this.street);
    address.push(
      `${this.cityLocality}, ${this.stateProvince} ${this.postalCode}`
    );
    address.push(this.country);
    return address.join("\n");
  }
}
