const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");

describe("validateAddress()", () => {
  it("Validates a residential address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const response = await shipengine.validateAddress({
      country: "US",
      street: ["4 Jersey St", "Suite 200", "validate-residential-address"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    });

    const { normalizedAddress, isValid } = response;

    expect(isValid).to.be.a("boolean").and.to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.true;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(normalizedAddress);

    // It should not throw errors
    assertNoErrors(response);
  });

  it("Validates a commercial address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const response = await shipengine.validateAddress({
      country: "US",
      street: ["4 Jersey St", "Suite 200", "validate-commercial-address"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    });

    const { normalizedAddress } = response;

    expect(response.isValid).to.be.true;
    expect(normalizedAddress.isResidential).to.be.a("boolean").and.to.be.false;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(normalizedAddress);

    // It should not throw errors
    assertNoErrors(response);
  });

  it("Validates an address of unknown type", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const response = await shipengine.validateAddress({
      country: "US",
      street: ["4 Jersey St", "Suite 200", "validate-unknown-address"],
      cityLocality: "Boston",
      stateProvince: "MA",
      postalCode: "02215",
    });

    const { normalizedAddress } = response;

    expect(response.isValid).to.be.true;
    expect(normalizedAddress.isResidential).to.be.undefined;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(normalizedAddress);

    // It should not throw errors
    assertNoErrors(response);
  });

  const assertNormalizedAddressMatchesOriginal = (normalizedAddress) => {
    expect(normalizedAddress.cityLocality).to.equal(
      normalizedAddress.cityLocality.toUpperCase()
    );
    expect(normalizedAddress.country).to.equal(
      normalizedAddress.country.toUpperCase()
    );

    expect(normalizedAddress.postalCode).to.equal(normalizedAddress.postalCode);

    expect(normalizedAddress.stateProvince).to.equal(
      normalizedAddress.stateProvince.toUpperCase()
    );
    expect(normalizedAddress.street[0]).to.equal(
      normalizedAddress.street[0].toUpperCase()
    );
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
