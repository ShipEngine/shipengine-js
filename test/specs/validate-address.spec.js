const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");

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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    expect(normalizedAddress.country).to.equal("US");
    expect(normalizedAddress.street).to.deep.equal(["4 JERSEY ST"]);
    expect(normalizedAddress.cityLocality).to.equal("BOSTON");
    expect(normalizedAddress.stateProvince).to.equal("MA");
    expect(normalizedAddress.postalCode).to.equal("02215");

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(true);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    expect(normalizedAddress.country).to.equal("US");
    expect(normalizedAddress.street).to.deep.equal(["4 JERSEY ST"]);
    expect(normalizedAddress.cityLocality).to.equal("BOSTON");
    expect(normalizedAddress.stateProvince).to.equal("MA");
    expect(normalizedAddress.postalCode).to.equal("02215");

    // The isResidential flag on the normalized address is false
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(false);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    expect(normalizedAddress.country).to.equal("US");
    expect(normalizedAddress.street).to.deep.equal(["4 JERSEY ST"]);
    expect(normalizedAddress.cityLocality).to.equal("BOSTON");
    expect(normalizedAddress.stateProvince).to.equal("MA");
    expect(normalizedAddress.postalCode).to.equal("02215");

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential).to.equal(undefined);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    expect(normalizedAddress.country).to.equal("US");

    // All lines of the address are returned in the correct order
    expect(normalizedAddress.street).to.deep.equal([
      "4 JERSEY ST STE 200",
      "2ND FLOOR",
    ]);
    expect(normalizedAddress.cityLocality).to.equal("BOSTON");
    expect(normalizedAddress.stateProvince).to.equal("MA");
    expect(normalizedAddress.postalCode).to.equal("02215");

    // The isResidential flag on the normalized address is false
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(false);

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    expect(normalizedAddress.country).to.equal("US");
    expect(normalizedAddress.street).to.deep.equal(["4 JERSEY ST"]);
    expect(normalizedAddress.cityLocality).to.equal("BOSTON");
    expect(normalizedAddress.stateProvince).to.equal("MA");

    // The correct postalCode is returned
    expect(normalizedAddress.postalCode).to.equal("02215");

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
  });

  it("Validates an address with an alpha zip code", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "CA",
      street: ["170 PRINCES' BLVD", "validate-canadian-address"],
      cityLocality: "Toronto",
      stateProvince: "On",
      postalCode: "M6K 3C3",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    // Verified that SE API does not capitalize Canadian normalized addresses
    expect(normalizedAddress.country).to.equal("CA");
    expect(normalizedAddress.street).to.deep.equal(["170 Princes' Blvd"]);
    expect(normalizedAddress.cityLocality).to.equal("Toronto");
    expect(normalizedAddress.stateProvince).to.equal("On");

    // The correct postalCode is returned
    expect(normalizedAddress.postalCode).to.equal("M6K 3C3");

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is true
    expect(isValid).to.be.a("boolean").and.to.equal(true);

    // The normalized address is populated and matches the original with adjustments
    // This is actually what SE API returns
    expect(normalizedAddress.country).to.equal("JP");
    expect(normalizedAddress.street).to.deep.equal(["68 Kamitobatsunodacho"]);
    expect(normalizedAddress.cityLocality).to.equal("Kyoto-Shi Minami-Ku");
    expect(normalizedAddress.stateProvince).to.equal("Kyoto");
    expect(normalizedAddress.postalCode).to.equal("601-8104");

    // There are no warning or error messages
    assertNoWarningsOrErrorMessages(response);

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    // The isValid flag is false
    // TODO: This fails. It is written to the Jira ticket spec but this is not how the mock RPC server responds
    expect(isValid).to.be.a("boolean").and.to.equal(false);

    // The normalized address is populated with the correct values
    expect(normalizedAddress.country).to.equal("CA");
    expect(normalizedAddress.street).to.deep.equal(["170 Princes' Blvd"]);
    expect(normalizedAddress.cityLocality).to.equal("Toronto");
    expect(normalizedAddress.stateProvince).to.equal("On");
    expect(normalizedAddress.postalCode).to.equal("M6K 3C3");

    // Warning messages are returned correctly
    expect(response.warnings).to.be.an("array").and.to.have.length(1);
    expect(response.warnings[0]).to.equal(
      "This address has been verified down to the house/building level (highest possible accuracy with the provided data)"
    );

    // There are no error messages
    expect(response.info).to.be.an("array").and.to.have.length(0);
    expect(response.errors).to.be.an("array").and.to.have.length(0);

    // It should have an normalized address with the correct shape
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

    expect(isValid).to.be.a("boolean").and.to.be.false;
    expect(normalizedAddress).to.be.undefined;

    // It should not throw errors
    expect(response.info).to.be.an("array").and.be.empty;
    expect(response.warnings).to.be.an("array").and.be.empty;
    expect(response.errors).to.be.an("array").and.not.be.empty;
    expect(response.errors[0]).to.equal("Invalid City, State, or Zip");
  });

  it("Throws an error if no address lines are provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      country: "US",
      street: [],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. At least one address line is required."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Throws an error if too many address lines are provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "Ste 200", "Building 2", "Platform 9 3/4"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("invalid_field_value");
    expect(error.message).to.equal(
      "Invalid address. No more than 3 street lines are allowed."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *provided*", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. Either the postal code or the city/locality and state/province must be specified."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Throws an error if th postalCode, cityLocality, and stateProvince properties are not *populated*", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "",
      stateProvince: "",
      postalCode: "",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. Either the postal code or the city/locality and state/province must be specified."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Throws an error if neither the postalCode nor the cityLocality is provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      stateProvince: "MA",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. Either the postal code or the city/locality and state/province must be specified."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Throws an error if neither the postalCode nor the stateProvince is provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. Either the postal code or the city/locality and state/province must be specified."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Validates an address when a postalCode is provided but neither cityLocality nor stateProvince is provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const addressToValidate = {
      country: "US",
      street: ["4 Jersey St", "validate-residential-address"],
      postalCode: "02215",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

    // It should have an normalized address with the correct shape
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

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // It should not throw errors
    assertNoWarningsOrErrorMessages(response);
  });

  it("Throws an error if the countryCode is not provided", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "01152",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. The country must be specified."
    );
    expect(error.requestId).to.be.undefined;
  });

  it("Throws an error if the countryCode is invalid", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    let error;
    const addressToValidate = {
      countryCode: "USA",
      street: ["4 Jersey St"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "01152",
    };

    try {
      await shipengine.validateAddress(addressToValidate);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.undefined;
    expect(error.source).to.equal("shipengine");
    expect(error.type).to.equal("validation");
    expect(error.code).to.equal("field_value_required");
    expect(error.message).to.equal(
      "Invalid address. The country must be specified."
    );
    expect(error.requestId).to.be.undefined;
  });

  const assertNormalizedAddressMatchesOriginal = (
    originalAddress,
    normalizedAddress
  ) => {
    expect(normalizedAddress.cityLocality.toUpperCase()).to.equal(
      originalAddress.cityLocality.toUpperCase()
    );
    expect(normalizedAddress.country.toUpperCase()).to.equal(
      originalAddress.country.toUpperCase()
    );

    expect(normalizedAddress.postalCode.toUpperCase()).to.equal(
      originalAddress.postalCode
    );

    expect(normalizedAddress.stateProvince.toUpperCase()).to.equal(
      originalAddress.stateProvince.toUpperCase()
    );
    expect(normalizedAddress.street[0].toUpperCase()).to.equal(
      originalAddress.street[0].toUpperCase()
    );

    if (normalizedAddress.street[1] !== undefined) {
      expect(normalizedAddress.street[1]).to.equal(
        originalAddress.street[1].toUpperCase()
      );
    }

    if (normalizedAddress.street[2] !== undefined) {
      expect(normalizedAddress.street[2]).to.equal(
        originalAddress.street[2].toUpperCase()
      );
    }
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
