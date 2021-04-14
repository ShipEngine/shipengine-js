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

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(
      addressToValidate,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
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

    const { normalizedAddress } = response;

    expect(response.isValid).to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.false;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(
      addressToValidate,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
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

    const { normalizedAddress } = response;

    expect(response.isValid).to.be.true;
    expect(normalizedAddress.isResidential).to.be.undefined;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(
      addressToValidate,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
  });

  it("Validates a multi-line address", async function () {
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

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.false;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    assertNormalizedAddressMatchesOriginal(
      addressToValidate,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
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

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(
      addressToValidate,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
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

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.false;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(
      addressToValidate,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
  });

  it("Validates an address with non-Latin characters", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const expectedNormalizedAddress = {
      street: ["68 Kamitobatsunodacho"],
      cityLocality: "Kyoto-Shi Minami-Ku",
      stateProvince: "Kyoto",
      postalCode: "601-8104",
      country: "JP",
    };

    const addressToValidate = {
      street: ["上鳥羽角田町６８", "validate-with-non-latin-chars"],
      cityLocality: "南区",
      stateProvince: "京都",
      postalCode: "601-8104",
      country: "JP",
    };

    const response = await shipengine.validateAddress(addressToValidate);

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.false;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(
      expectedNormalizedAddress,
      normalizedAddress
    );

    // It should not throw errors
    assertNoErrors(response);
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

    if (normalizedAddress.street[2] !== undefined) {
      expect(normalizedAddress.street[2]).to.equal(
        originalAddress.street[2].toUpperCase()
      );
    }

    if (normalizedAddress.street[3] !== undefined) {
      expect(normalizedAddress.street[3]).to.equal(
        originalAddress.street[3].toUpperCase()
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

  const assertNoErrors = (response) => {
    expect(response.info).to.be.an("array").and.be.empty;
    expect(response.warnings).to.be.an("array").and.be.empty;
    expect(response.errors).to.be.an("array").and.be.empty;
  };
});
