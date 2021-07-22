// import { Country, ErrorCode, ErrorType } from "../enums";
// import { ShipEngineError } from "../errors";
// import * as assert from "../utils/assert";
// import { isCountry } from "../utils/type-guards";
// import { ValidateAddressParams } from "./types/public-params";

// /**
//  * Performs client-side validation of the address object that's passed-in by
//  * the user. If the address object is invalid, an error is thrown.
//  */
// export function validateParams(params: ValidateAddressParams): void {
//   assert.isPOJO("Address", params);
//   validateAddressLineOne(params.addressLineOne);
//   validateCountry(params.country);
//   validateCityStatePostalCode(params);

//   // Optional fields
//   params.name && assert.isString("Name", params.name);
//   params.company && assert.isString("Company name", params.company);
//   params.phone && assert.isString("Phone number", params.phone);
//   params.isResidential &&
//     assert.isBoolean("Residential indicator", params.isResidential);
// }

// /**
//  * Validates the `validateAddressLineOne` field of an input address
//  */
// function validateAddressLineOne(addressLineOne: string | undefined): void {
//   if (!addressLineOne) {
//     throw new ShipEngineError(
//       ErrorType.Validation,
//       ErrorCode.FieldValueRequired,
//       "Invalid address. The addressLineOne must be specified."
//     );
//   }
// }

// /**
//  * Validates the `country` field of an input address
//  */
// function validateCountry(country: Country): void {
//   if (!country) {
//     throw new ShipEngineError(
//       ErrorType.Validation,
//       ErrorCode.FieldValueRequired,
//       "Invalid address. The country must be specified."
//     );
//   }

//   if (!isCountry(country)) {
//     throw new ShipEngineError(
//       ErrorType.Validation,
//       ErrorCode.InvalidFieldValue,
//       `Invalid address. ${country} is not a valid country code.`
//     );
//   }
// }

// /**
//  * Ensures that either the `postalCode` or the `cityLocality` and `stateProvince`
//  * fields are populated.
//  */
// function validateCityStatePostalCode(params: ValidateAddressParams): void {
//   if (params.postalCode) {
//     assert.isNonWhitespaceString("Postal code", params.postalCode);
//   } else if (params.cityLocality && params.stateProvince) {
//     assert.isNonWhitespaceString("City/locality", params.cityLocality);
//     assert.isNonWhitespaceString("State/province", params.stateProvince);
//   } else {
//     throw new ShipEngineError(
//       ErrorType.Validation,
//       ErrorCode.FieldValueRequired,
//       `Invalid address. Either the postal code or the city/locality and state/province must be specified.`
//     );
//   }
// }
export {};
