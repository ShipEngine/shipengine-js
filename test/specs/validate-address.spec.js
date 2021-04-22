const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("validateAddress()", () => {
  it("Validates a residential address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-residential-address"],
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
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(true);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates a commercial address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-commercial-address"],
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

    // The isResidential flag on the normalized address is false
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(false);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address of unknown type", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-unknown-address"],
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

  it("Validates a multiline address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: [
        "4 JERSEY ST STE 200",
        "2nd Floor",
        "validate-multiline-address",
      ],
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

  it("Validates an address with a numeric zip code", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-residential-address"],
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

  it("Validates an address with an alpha zip code", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Princes' Blvd", "validate-canadian-address"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const expectedNormalizedAddress = {
      country: "CA",
      street: ["170 Princes' Blvd"],
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

  it("Validates an address with non-Latin characters", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      street: ["上鳥羽角田町６８", "validate-with-non-latin-chars"],
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

  it("Validates an address with warning messages", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Princes' Blvd", "validate-with-warning"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const expectedNormalizedAddress = {
      country: "CA",
      street: ["170 Princes' Blvd"],
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

    // The normalized address is populated with the correct values
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // Warning messages are returned correctly
    expect(response.warnings).to.be.an("array").and.to.have.length(1);
    expect(response.warnings).to.deep.equals([
      "This address has been verified down to the house/building level (highest possible accuracy with the provided data)",
    ]);

    // There are no error messages
    expect(response.info).to.be.an("array").and.to.have.length(0);
    expect(response.errors).to.be.an("array").and.to.have.length(0);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with error messages", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Princes' Blvd", "validate-with-error"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is false
    expect(isValid).to.be.a("boolean").and.to.equal(false);

    // The normalized address is null
    expect(normalizedAddress).to.equal(undefined);

    // Warning and error messages are returned correctly
    expect(response.info).to.be.an("array").and.to.have.length(0);
    expect(response.warnings).to.be.an("array").and.to.have.length(0);
    expect(response.errors).to.be.an("array").and.to.have.length(1);
    expect(response.errors).to.deep.equal(["Invalid City, State, or Zip"]);
  });

  it("Throws an error if no address lines are provided", async function () {
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

  it("Throws an error if too many address lines are provided", async function () {
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

  it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *provided*", async function () {
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

  it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *populated*", async function () {
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

  it("Throws an error if neither the postalCode nor the cityLocality is provided, (state only provided)", async function () {
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

  it("Throws an error if neither the postalCode nor the stateProvince is provided (citLocality only provided)", async function () {
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

  it("Validates an address when a postalCode is provided but neither cityLocality nor stateProvince is provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-residential-address"],
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

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

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

  it("Validates an address when cityLocality and stateProvince are provided but no postalCode is provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-residential-address"],
      cityLocality: "Boston",
      stateProvince: "MA",
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

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

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

  it("Throws an error if the country is not provided", async function () {
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

  it("Throws an error if the country is invalid", async function () {
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

  it("Throws an error if there is a server-side error", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "rpc-server-error"],
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
        type: "system",
        code: "unspecified",
        message: "Unable to connect to the database",
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
