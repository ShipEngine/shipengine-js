const { sendValidateAddressRequest } = require("../utils/helpers");
const { expect } = require("chai");

const {
  assertNoErrors,
  assertNormalizedAddressFormat,
  assertNormalizedAddressMatchesOriginal,
  assertIsValid,
} = require("../utils/assertions");

describe("validateAddress()", () => {
  const address = {
    country: "US",
    street: ["4 Jersey St", "Suite 200"],
    cityLocality: "Boston",
    stateProvince: "MA",
    postalCode: "02215",
  };

  it("Validate a residential address", async function () {
    let residentialAddress = {
      ...address,
    };

    // Add the string used by the mock RPC server
    residentialAddress.street[1] = "validate-residential-address";

    const response = await sendValidateAddressRequest(residentialAddress);

    const { normalizedAddress } = response;

    assertIsValid(response);
    expect(normalizedAddress.isResidential).to.be.true;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(normalizedAddress);

    // It should not throw errors
    assertNoErrors(response);
  });

  it("Validate a commercial address", async function () {
    let residentialAddress = {
      ...address,
    };

    // Add the string used by the mock RPC server
    residentialAddress.street[1] = "validate-commercial-address";

    const response = await sendValidateAddressRequest(residentialAddress);

    const { normalizedAddress } = response;

    assertIsValid(response);
    expect(normalizedAddress.isResidential).to.be.false;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);

    // The normalized address should match the original address
    assertNormalizedAddressMatchesOriginal(normalizedAddress);

    // It should not throw errors
    assertNoErrors(response);
  });
});
