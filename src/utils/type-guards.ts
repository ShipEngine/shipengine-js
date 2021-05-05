import { Country, CarrierCode } from "../enums";

/**
 * Determines whether the given value is a valid ShipEngine country code.
 */
export function isCountry(country: unknown): country is Country {
  return Object.values(Country).includes(country as Country);
}

/**
 * Determines whether the given value is a valid ShipEngine carrier code.
 */
export function isCarrierCode(code: unknown): code is CarrierCode {
  return Object.values(CarrierCode).includes(code as CarrierCode);
}
