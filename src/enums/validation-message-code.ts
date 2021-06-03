/**
 * The different address validation messages that can be returned by ShipEngine.
 *
 * @see https://www.shipengine.com/docs/addresses/validation/messages/
 */
export enum ValidationMessageCode {
  /**
   * This address is in a country that is not currently supported.
   */
  UnsupportedCountry = "unsupported_country",

  /**
   * Could not verify this address to the postal code level.
   */
  MinimumPostalCodeVerificationFailed = "minimum_postal_code_verification_failed",

  /**
   * Could not match the inputted street name to a unique street name.
   * No matches or too many matches were found.
   */
  StreetDoesNotMatchUniqueStreetName = "street_does_not_match_unique_street_name",

  /**
   * The provided directionals (N, S, SW, etc.) and suffix (ST, RD, AVE)
   * combination is incorrect and resulted in multiple records.
   */
  MultipleDirectionals = "multiple_directionals",

  /**
   * The street address was found, but the suite number is invalid.
   */
  SuiteNotValid = "suite_not_valid",

  /**
   * The street address was found, but the suite number is missing.
   */
  SuiteMissing = "suite_missing",

  /**
   * The value for house/building number is invalid.
   */
  InvalidHouseNumber = "invalid_house_number",

  /**
   * The value for house/building number is missing.
   */
  MissingHouseNumber = "missing_house_number",

  /**
   * The value for PO (Post Office Box), RR (Rural Route), or HC (Highway Contract)
   * box number is invalid.
   */
  InvalidBoxNumber = "invalid_box_number",

  /**
   * The value for PO (Post Office Box), RR (Rural Route), or HC (Highway Contract)
   * box number is missing.
   */
  MissingBoxNumber = "missing_box_number",

  /**
   * There was a suite number entered, but the location does not have secondaries
   * (suites).
   */
  SuiteHasNoSecondaries = "suite_has_no_secondaries",

  /**
   * The address could not be found due to insufficient or incorrect data, or the
   * address is non-deliverable
   */
  AddressNotFound = "address_not_found",

  /**
   * There was a change or addition to the postal code.
   */
  PostalCodeChangedOrAdded = "postal_code_changed_or_added",

  /**
   * There was a change or addition to the state/province.
   */
  StateProvinceChangedOrAdded = "state_province_changed_or_added",

  /**
   * There was a change or addition to the locality name (city, municipality).
   */
  CityLocalityChangedOrAdded = "city_locality_changed_or_added",

  /**
   * There was a change to the dependent locality (urbanization).
   */
  UrbanizationChanged = "urbanization_changed",

  /**
   * There was a change or addition to the street name due to a spelling correction.
   */
  StreetNameSpellingChangedOrAdded = "street_name_spelling_changed_or_added",

  /**
   * There was a change or addition to the street leading or trailing type, like
   * from "St." to Rd.".
   */
  StreetNameTypeChangedOrAdded = "street_name_type_changed_or_added",

  /**
   * There was a change or addition to the street pre-directional or post-directional,
   * like from "N" to "S".
   */
  StreetDirectionChangedOrAdded = "street_direction_changed_or_added",

  /**
   * There was a change or addition to the suite type, like from "STE" to "APT".
   */
  SuiteTypeChangedOrAdded = "suite_type_changed_or_added",

  /**
   * There was a change or addition to the suite/unit number.
   */
  SuiteUnitNumberChangedOrAdded = "suite_unit_number_changed_or_added",

  /**
   * There was a change or addition to the double-dependent locality.
   */
  DoubleDependentLocalityChangedOrAdded = "double_dependent_locality_changed_or_added",

  /**
   * There was a change or addition to the sub-administrative area.
   */
  SubadministrativeAreaChangedOrAdded = "subadministrative_area_changed_or_added",

  /**
   * There was a change or addition to the sub-national area.
   */
  SubnationalAreaChangedOrAdded = "subnational_area_changed_or_added",

  /**
   * There was a change or addition to the PO Box.
   */
  PoBoxChangedOrAdded = "po_box_changed_or_added",

  /**
   * There was a change or addition to the premise type.
   */
  PremiseTypeChangedOrAdded = "premise_type_changed_or_added",

  /**
   * There was a change or addition to the house number.
   */
  HouseNumberChanged = "house_number_changed",

  /**
   * There was a change or addition to the organization.
   */
  OrganizationChangedOrAdded = "organization_changed_or_added",

  /**
   * This address has been partially verified down to the administrative area/state
   * level. This is NOT the highest level possible with the data provided.
   */
  PartiallyVerifiedToStateLevel = "partially_verified_to_state_level",

  /**
   * This address has been partially verified down to the city level. This is NOT
   * the highest level possible with the data provided.
   */
  PartiallyVerifiedToCityLevel = "partially_verified_to_city_level",

  /**
   * This address has been partially verified down to the street level. This is
   * NOT the highest level possible with the data provided.
   */
  PartiallyVerifiedToStreetLevel = "partially_verified_to_street_level",

  /**
   * This address has been partially verified down to the house/building level.
   * This is NOT the highest level possible with the data provided.
   */
  PartiallyVerifiedToPremiseLevel = "partially_verified_to_premise_level",

  /**
   * This address has been verified down to the state level (highest possible
   * accuracy with the provided data)
   */
  VerifiedToStateLevel = "verified_to_state_level",

  /**
   * This address has been verified down to the city level (highest possible
   * accuracy with the provided data)
   */
  VerifiedToCityLevel = "verified_to_city_level",

  /**
   * This address has been verified down to the street level (highest possible
   * accuracy with the provided data)
   */
  VerifiedToStreetLevel = "verified_to_street_level",

  /**
   * This address has been verified down to the house/building level (highest
   * possible accuracy with the provided data)
   */
  VerifiedToPremiseLevel = "verified_to_premise_level",

  /**
   * This address has been verified down to the suite/PO box level (highest
   * possible accuracy with the provided data)
   */
  VerifiedToSuiteLevel = "verified_to_suite_level",

  /**
   * This record was successfully geocoded to the street level
   * (US ZIP+4, Canada full postal code)
   */
  CodedToStreetLevel = "coded_to_street_level",

  /**
   * This record was successfully geocoded to the neighborhood level (US ZIP+2)
   */
  CodedToNeighborhoodLevel = "coded_to_neighborhood_level",

  /**
   * This record was successfully geocoded to the community level (ZIP centroid
   * in the US, 3 digit postal code for Canada)
   */
  CodedToCommunityLevel = "coded_to_community_level",

  /**
   * This record was successfully geocoded to the state or administrative area level.
   */
  CodedToStateLevel = "coded_to_state_level",

  /**
   * This record was successfully geocoded down to the rooftop level, meaning
   * this point is within the property limits (most likely in the center).
   */
  CodedToRooftopLevel = "coded_to_rooftop_level",

  /**
   * This recored was successfully geocoded down to the rooftop level through
   * street coordinate interpolation. This point is most likely within or close
   * to the property limits.
   */
  CodedToRooftopInterpolationLevel = "coded_to_rooftop_interpolation_level",
}
