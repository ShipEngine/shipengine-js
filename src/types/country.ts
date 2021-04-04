export enum Country {
  UnitedStates = "US",
  Jamaica = "JM",
  France = "FR",
}

// This is a type guard, types start with Cap
export function isCountry(country: unknown): country is Country {
  return Object.values(Country).includes(country as Country);
}
