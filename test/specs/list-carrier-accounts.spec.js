const { expect } = require("chai");
const { ShipEngine } = require("../../esm");
const { apiKey } = require("../utils/constants");
// const errors = require("../utils/errors");
// const nock = require("nock");

describe("listCarrierAccounts()", () => {
  it("Returns a list of connected carrier accounts", async () => {
    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.listCarrierAccounts();

    console.log(result);

    expect(result).to.deep.equal({
      status: "verified",
      originalAddress: {
        name: "John Smith",
        company: "",
        addressLineOne: "3910 Bailey Lane",
        addressLineTwo: "",
        addressLineThree: "",
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        country: "US",
        isResidential: true,
      },
      normalizedAddress: {
        name: "JOHN SMITH",
        company: "",
        addressLineOne: "3910 BAILEY LN",
        addressLineTwo: "",
        addressLineThree: "",
        cityLocality: "AUSTIN",
        stateProvince: "TX",
        postalCode: "78756-3924",
        country: "US",
        isResidential: true,
      },
      messages: [],
    });

    // There are no warning or error messages
    expect(result.messages).to.be.an("array").and.be.empty;
  });
});
