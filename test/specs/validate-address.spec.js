const { ShipEngine } = require("../../");
const { expect } = require("chai");
const { assertString, assertNoErrors } = require("../utils/assertions");
// const constants = require("../../utils/constants");
// const { Messages } = require("../../../src/shared/models/messsages");

let shipengine;
let response;

describe("validateAddress()", () => {
  const address = {
    country: "US",
    street: ["4 Jersey St", "Suite 200", "validate-residential-address"],
    cityLocality: "Boston",
    stateProvince: "MA",
    postalCode: "02215",
  };

  const assertNormalizedAddressFormat = (normalizedAddress) => {
    expect(normalizedAddress).to.be.an("object");
    assertString(normalizedAddress.country);
    assertString(normalizedAddress.cityLocality);
    assertString(normalizedAddress.stateProvince);
    assertString(normalizedAddress.postalCode);
  };

  const assertNormalizedAddressMatchesOriginal = (normalizedAddress) => {
    expect(normalizedAddress.country).to.equal(
      normalizedAddress.country.toUpperCase()
    );
    expect(normalizedAddress.street[0]).to.equal(
      normalizedAddress.street[0].toUpperCase()
    );
    expect(normalizedAddress.cityLocality).to.equal(
      normalizedAddress.cityLocality.toUpperCase()
    );
    expect(normalizedAddress.postalCode).to.equal(normalizedAddress.postalCode);
    expect(normalizedAddress.stateProvince).to.equal(
      normalizedAddress.stateProvince.toUpperCase()
    );
    expect(normalizedAddress.isResidential).to.be.true;
  };

  it("Valid should be the right type", async function () {
    try {
      shipengine = new ShipEngine({
        apiKey: "MY_API_KEY",
        baseUrl: "https://simengine.herokuapp.com",
        timeout: 20000,
      });
      response = await shipengine.validateAddress(address);
      console.log(JSON.stringify(response));
    } catch (e) {
      console.log(`Error from test: ${e.message}`);
    }

    const { normalizedAddress } = response;

    // It should have an normalized address with the correct shape
    assertNormalizedAddressFormat(normalizedAddress);
    assertNormalizedAddressMatchesOriginal(normalizedAddress);
    assertNoErrors(response);
  });
});
