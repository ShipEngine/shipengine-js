import { Country } from "../enums";

/**
 * Determines whether the given value is a valid ShipEngine country code.
 */
export function isCountry(country: unknown): country is Country {
  return Object.values(Country).includes(country as Country);
}
