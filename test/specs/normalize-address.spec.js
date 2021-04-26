const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const { assertAddressObject } = require("../utils/addresses");
const addresses = require("../utils/addresses");

describe("normalizeAddress()", () => {
  it("Normalizes a residential address", async function () {
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
      phone: "",
    };

    const normalizedAddress = await shipengine.normalizeAddress(
      addressToValidate
    );

    assertAddressObject(normalizedAddress);

    // The normalized address is populated and matches the expected normalized address
    addresses.assertAddressEquals(normalizedAddress, expectedNormalizedAddress);

    // The isResidential flag on the normalized address is true
    expect(normalizedAddress.isResidential)
      .to.be.a("boolean")
      .and.to.equal(true);
    //
    // // There are no warning or error messages
    // assertNoWarningsOrErrorMessages(response);
    //
    // // It should have a normalized address with the correct shape
    addresses.assertNormalizedAddressFormat(normalizedAddress);
  });
});






