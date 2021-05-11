const { expect, assert } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("listCarrierAccounts()", () => {
  it("No accounts setup yet", async function () {
    let response;
    const carrierName = "royal_mail";

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      response = await shipengine.listCarrierAccounts(carrierName);
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }
    expect(response).to.eql([]);
  });

  it("Multiple carrierNames", async function () {
    let response;

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      response = await shipengine.listCarrierAccounts();
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }
    console.log(response);
    const { accounts } = response;

    for (let a of accounts) {
    }
  });
});

// function assertFormat(account) {
//   expect(account.)
// }
