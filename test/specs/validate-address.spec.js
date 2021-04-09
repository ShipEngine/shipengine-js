const { ShipEngine } = require("../../");
const { expect } = require("chai");
// const constants = require("../../utils/constants");
// const { Messages } = require("../../../src/shared/models/messsages");

let shipengine;
let response;

describe("validateAddress()", () => {
  const address = {
    country: "US",
    street: "10702 Seven Oaks Cove",
    cityLocality: "Austin",
    postalCode: "TX",
  };

  const assertResponseAddress = (normalizedAddress) => {
    expect(normalizedAddress).to.be.an("object");
    expect(normalizedAddress.cityLocality).to.be.a("string");
    expect(normalizedAddress.postalCode).to.be.a("string");
    expect(normalizedAddress.street).to.be.an("array");
    expect(normalizedAddress.isResidential).to.be.a("boolean");
    // expect(normalizedAddress.isResidential).to.be.true;
  };

  // TODO: Implement. Need to change my address to use the one in the mock
  // server to get this pass and flesh out the other assertions.
  const assertNormalizedAddressMatchesOriginal = (normalizedAddress) => {
    expect(normalizedAddress.country).to.be(address.country);
    expect(normalizedAddress.cityLocality).to.be(address.cityLocality);
    expect(normalizedAddress.postalCode).to.be.a("string");
    expect(normalizedAddress.street).to.be.an("array");
  };

  const assertNoErrors = (response) => {
    assertEmptyArray(response.info);
    assertEmptyArray(response.warnings);
    assertEmptyArray(response.errors);
  };

  const assertEmptyArray = (value) => {
    expect(value).to.be.an("array");
    expect(value.length).to.equal(0);
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

    // It should have an normalized address with the correct shape
    assertResponseAddress(response.normalizedAddress);
    assertNoErrors(response);
    // assertNormalizedAddressMatchesOriginal(response.normalizedAddress);
  });
});
