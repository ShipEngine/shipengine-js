const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("validateAddress()", () => {
  it("Validates a residential address", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Apt. 2b"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST APT 2B"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(true);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates a commercial address", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["400 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["400 JERSEY ST"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is false
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(false);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address of unknown type", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential).to.equal(undefined);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates a multiline address", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St.", "Suite 200", "2nd Floor"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST STE 200", "2ND FLOOR"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // All lines of the address are returned in the correct order
    expect(normalizedAddress.street).to.deep.equal([
      "4 JERSEY ST STE 200",
      "2ND FLOOR",
    ]);

    // The isResidential flag on the normalized address is false
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(false);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with a numeric zip code", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The correct postalCode is returned
    expect(normalizedAddress.postalCode).to.equal("02215");

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with an alpha zip code", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Princes' Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const expectedNormalizedAddress = {
      country: "CA",
      street: ["170 Princes Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    // Verified that SE API does not capitalize Canadian normalized addresses
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The correct postalCode is returned
    expect(normalizedAddress.postalCode).to.equal("M6K 3C3");

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with non-Latin characters", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      street: ["上鳥羽角田町６８"],
      cityLocality: "南区",
      stateProvince: "京都",
      postalCode: "601-8104",
      country: "JP",
    };

    const expectedNormalizedAddress = {
      street: ["68 Kamitobatsunodacho"],
      cityLocality: "Kyoto-Shi Minami-Ku",
      stateProvince: "Kyoto",
      postalCode: "601-8104",
      country: "JP",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the expected normalized address
    // This is actually what SE API returns
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with warning messages", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      street: ["170 Warning Blvd", "Apartment 32-B"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
      country: "CA",
    };

    const expectedNormalizedAddress = {
      name: "",
      company: "",
      street: ["170 Warning Blvd Apt 32-B"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
      country: "CA",
    };

    const expectedWarningMessage = {
      type: "warning",
      code: "partially_verified_to_premise_level",
      message:
        "This address has been verified down to the house/building level (highest possible accuracy with the provided data)",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated with the correct values
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // Messages are returned correctly
    expect(response.messages).to.deep.equal([expectedWarningMessage]);

    // Warning messages are returned correctly
    expect(response.warnings).to.deep.equals([expectedWarningMessage]);

    // There are no info or error messages
    expect(response.info).to.deep.equal([]);
    expect(response.errors).to.deep.equal([]);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with error messages", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      street: ["170 Invalid Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
      country: "CA",
    };

    const expectedWarningMessage = {
      code: "address_not_found",
      message: "Address not found",
      type: "warning",
    };

    const expectedErrorMessage1 = {
      code: "address_not_found",
      message: "Invalid City, State, or Zip",
      type: "error",
    };

    const expectedErrorMessage2 = {
      code: "address_not_found",
      message: "Insufficient or Incorrect Address Data",
      type: "error",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is false
    expect(isValid).to.be.a("boolean").and.to.equal(false);

    // The normalized address is null
    expect(normalizedAddress).to.equal(undefined);

    // Messages are returned correctly
    expect(response.messages).to.deep.equal([
      expectedWarningMessage,
      expectedErrorMessage1,
      expectedErrorMessage2,
    ]);

    expect(response.info).to.deep.equal([]);
    expect(response.warnings).to.deep.equal([expectedWarningMessage]);

    expect(response.errors).to.deep.equal([
      expectedErrorMessage1,
      expectedErrorMessage2,
    ]);
  });

  it("Throws an error if no address lines are provided", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: [],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message: "Invalid address. At least one address line is required.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if too many address lines are provided", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Ste 200", "Building 2", "Platform 9 3/4"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: "Invalid address. No more than 3 street lines are allowed.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *provided*", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message:
          "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *populated*", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "",
      stateProvince: "",
      postalCode: "",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message:
          "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if neither the postalCode nor the cityLocality is provided, (state only provided)", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      stateProvince: "MA",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message:
          "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if neither the postalCode nor the stateProvince is provided (citLocality only provided)", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message:
          "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Validates an address when a postalCode is provided but neither cityLocality nor stateProvince is provided", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST"],
      cityLocality: "METROPOLIS",
      stateProvince: "TX",
      postalCode: "02215",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;

    // The city and state should be populated even though it was not provided
    expect(normalizedAddress.cityLocality).to.equal(
      expectedNormalizedAddress.cityLocality
    );
    expect(normalizedAddress.stateProvince).to.equal(
      expectedNormalizedAddress.stateProvince
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // It should not throw errors
    assertNoWarningsOrErrorMessages(response);
  });

  it("Validates an address when cityLocality and stateProvince are provided but no postalCode is provided", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "12345",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;

    // The postalCode should to popoulated even though it was not provided
    expect(normalizedAddress.postalCode).to.equal(
      expectedNormalizedAddress.postalCode
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // It should not throw errors
    assertNoWarningsOrErrorMessages(response);
  });

  it("Normalizes a lowercase country to uppercase", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "us",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "12345",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;

    // The lowercase "us" should have been normalized to uppercase
    expect(normalizedAddress.country).to.equal("US");

    // The postalCode should to popoulated even though it was not provided
    expect(normalizedAddress.postalCode).to.equal(
      expectedNormalizedAddress.postalCode
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // It should not throw errors
    assertNoWarningsOrErrorMessages(response);
  });

  it("Removes whitespace from the country", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: " \t  us  \n  ",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "12345",
      name: "",
      company: "",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;

    // The whitespace in the country should have been removed
    expect(normalizedAddress.country).to.equal("US");

    // The postalCode should to popoulated even though it was not provided
    expect(normalizedAddress.postalCode).to.equal(
      expectedNormalizedAddress.postalCode
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // It should not throw errors
    assertNoWarningsOrErrorMessages(response);
  });

  it("Throws an error if the country is not provided", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const addressToValidate = {
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "01152",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message: "Invalid address. The country must be specified.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if the country is invalid", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "USA",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "01152",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: "Invalid address. USA is not a valid country code.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if there is a server-side error", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      street: ["500 Server Error"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "01152",
      country: "US",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message:
          "Unable to process this request. A downstream API error occurred.",
      });
      expect(error.requestID).to.match(/^req_\w+$/);
    }
  });

  const assertAddressEquals = (actual, expected) => {
    expect(actual.name).to.equal(expected.name);
    expect(actual.company).to.equal(expected.company);
    expect(actual.street).to.deep.equal(expected.street);
    expect(actual.cityLocality).to.equal(expected.cityLocality);
    expect(actual.stateProvince).to.equal(expected.stateProvince);
    expect(actual.postalCode).to.equal(expected.postalCode);
    expect(actual.country).to.equal(expected.country);
  };

  const assertNormalizedAddressFormat = (normalizedAddress) => {
    expect(normalizedAddress)
      .to.be.an("object")
      .with.keys(
        "cityLocality",
        "company",
        "country",
        "isResidential",
        "name",
        "phone",
        "postalCode",
        "stateProvince",
        "street",
        "toString"
      );
    if (normalizedAddress.isResidential !== undefined) {
      expect(normalizedAddress.isResidential).to.be.a("boolean");
    }
    expect(normalizedAddress.cityLocality).to.be.a("string");
    expect(normalizedAddress.company).to.be.a("string");
    expect(normalizedAddress.country).to.be.a("string");
    expect(normalizedAddress.name).to.be.a("string");
    expect(normalizedAddress.phone).to.be.a("string");
    expect(normalizedAddress.postalCode).to.be.a("string");
    expect(normalizedAddress.stateProvince).to.be.a("string");
    expect(normalizedAddress.street).to.be.a("array");
    expect(normalizedAddress.toString).to.be.a("function");
  };

  const assertNoWarningsOrErrorMessages = (response) => {
    expect(response.info).to.be.an("array").and.be.empty;
    expect(response.warnings).to.be.an("array").and.be.empty;
    expect(response.errors).to.be.an("array").and.be.empty;
  };
});
