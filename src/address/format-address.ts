import { NormalizedAddress } from "./public-types";

/**
 * Formats the address in a user-friendly way
 */
export function formatAddress(this: NormalizedAddress): string {
  const address = [];
  this.company && address.push(this.company);
  address.push(...this.street);
  address.push(
    `${this.cityLocality}, ${this.stateProvince} ${this.postalCode}`
  );
  address.push(this.country);
  return address.join("\n");
}
