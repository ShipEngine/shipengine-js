const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("validateAddress()", () => {
  it("Validates a residential address", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    const response = await shipengine.;

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
});
