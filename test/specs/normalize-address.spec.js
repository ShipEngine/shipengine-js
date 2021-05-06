const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");
const {
  assertNormalizedAddressFormat,
  assertAddressEquals,
} = require("../utils/addresses");

describe("normalizeAddress()", () => {
  it("Normalizes a residential address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Apartment 7b"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST APT 7B"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(true);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes a commercial address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Suite 200"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    const expectedNormalizedAddress = {
      country: "US",
      street: ["4 JERSEY ST STE 200"],
      cityLocality: "BOSTON",
      stateProvince: "MA",
      postalCode: "02215",
      name: "",
      company: "",
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(false);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes an address that is unknown whether it is a residential address", async function () {
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
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential).to.equal(undefined);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes a multi-line address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Suite 200", "2nd Floor"],
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
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    // This method performs a deep equals to ensure the address lines are returned
    // in the correct order
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes an address with a numeric zip code", async function () {
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
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The correct postalCode is returned
    expect(normalizedAddress.postalCode).to.equal("02215");

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes an address with an alpha zip code", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Princes Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const expectedNormalizedAddress = {
      country: "CA",
      street: ["170 Princes Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6 K 3 C3",
      name: "",
      company: "",
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The correct postalCode is returned
    expect(normalizedAddress.postalCode).to.equal("M6 K 3 C3");

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes an address with a non-Latin characters", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      street: ["上鳥羽角田町６８", "address-with-non-latin-chars"],
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
      phone: "",
    };
    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes an address with warnings", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Warning Blvd", "Apartment 32-B"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const expectedNormalizedAddress = {
      country: "CA",
      street: ["170 Warning Blvd Apt 32-B"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
      name: "",
      company: "",
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Throws an error with 1 error message", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Error Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    try {
      await shipengine.normalizeAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "business_rules",
        code: "invalid_address",
        message: "Invalid address. Insufficient or innacurate postal code",
      });
      expect(error.requestId).to.equal(undefined);
    }
  });

  it("Throws an error with multiple error messages", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 Invalid Blvd"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    try {
      await shipengine.normalizeAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "business_rules",
        code: "invalid_address",
        message:
          "Invalid address. \n" +
          "Invalid City, State, or Zip\n" +
          "Insufficient or Incorrect Address Data",
      });
      expect(error.requestId).to.equal(undefined);
    }
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
      await shipengine.normalizeAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message: "Invalid address. At least one address line is required.",
      });
      expect(error.requestId).to.equal(undefined);
    }
  });

  it("Throws an error if too many address lines", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Ste 200", "Building 2", "Platform 9 3/4"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    try {
      await shipengine.normalizeAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: "Invalid address. No more than 3 street lines are allowed.",
      });
      expect(error.requestId).to.equal(undefined);
    }
  });

  it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *provided*", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
    };

    try {
      await shipengine.normalizeAddress(addressToValidate);
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
      expect(error.requestId).to.equal(undefined);
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
      await shipengine.normalizeAddress(addressToValidate);
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
      expect(error.requestId).to.equal(undefined);
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
      await shipengine.normalizeAddress(addressToValidate);
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
      expect(error.requestId).to.equal(undefined);
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
      await shipengine.normalizeAddress(addressToValidate);
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
      expect(error.requestId).to.equal(undefined);
    }
  });

  it("Normalizes an address when a postalCode is provided but neither cityLocality nor stateProvince is provided", async function () {
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
      stateProvince: "ME",
      postalCode: "02215",
      name: "",
      company: "",
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Normalizes an address when cityLocality and stateProvince are provided but no postalCode is provided", async function () {
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
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    // The normalized address is populated and matches the expected normalized address
    assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // It should have a normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
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
      await shipengine.normalizeAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "field_value_required",
        message: "Invalid address. The country must be specified.",
      });
      expect(error.requestId).to.equal(undefined);
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
      await shipengine.normalizeAddress(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: "Invalid address. USA is not a valid country code.",
      });
      expect(error.requestId).to.equal(undefined);
    }
  });

  it("Throws an error if there is a server-side error", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["500 Server Error"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "01152",
    };

    try {
      await shipengine.normalizeAddress(addressToValidate);
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
});
