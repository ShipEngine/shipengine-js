const { expect, assert } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("getCarrierAccounts()", async function () {
  it("Returns an empty array if no accounts are setup yet", async function () {
    let response;
    const carrierName = "royal_mail";

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      response = await shipengine.getCarrierAccounts(carrierName);
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }
    expect(response).to.eql([]);
  });

  it("Returns multiple accounts for different carriers", async function () {
    let accounts;

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      accounts = await shipengine.getCarrierAccounts();
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }

    // The list contains the expected number of carrier accounts
    expect(accounts).to.be.an("array").and.lengthOf(5);

    // The list contains the expected carrier accounts (IDs, names, account numbers, etc.)
    // All accounts have an account name
    assertAccountsMatch(accounts);

    // All accounts have a valid carrier ID (starts with "car_", followed by a base58 string)
    assertCarrierIdFormat(accounts);

    // All accounts have a unique account ID
    assertUniqueIds(accounts);

    // Function asserts that the shape of the accounts is correct, including
    // All accounts have an account name
    assertAccountFormat(accounts);
  });

  it("Returns multiple accounts for the same carrier", async function () {
    let accounts;
    let carrierCode = "fedex";

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      accounts = await shipengine.getCarrierAccounts(carrierCode);
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }

    // The list contains the expected number of carrier accounts
    expect(accounts).to.be.an("array").and.lengthOf(5);

    // The list contains the expected carrier accounts (IDs, names, account numbers, etc.)
    // All accounts have an account name
    assertAccountsMatch(accounts);

    // All accounts have a valid carrier ID (starts with "car_", followed by a base58 string)
    assertCarrierIdFormat(accounts);

    // All accounts have a unique account ID
    assertUniqueIds(accounts);

    // Function asserts that the shape of the accounts is correct, including
    // All accounts have an account name
    assertAccountFormat(accounts);
  });

  it("Throws a server-side error", async function () {
    let carrierName = "access_worldwide";

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      await shipengine.getCarrierAccounts(carrierName);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message: "Unable to connect to the database",
      });
      expect(error.requestID).to.match(/^req_\w+$/);
    }
  });

  it("Throws an client-side error if an invalid carrierCode is passed", async function () {
    let carrierName = "my_carrier";

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      await shipengine.getCarrierAccounts(carrierName);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: `Invalid input. ${carrierName} is not a valid carrier code.`,
      });
      expect(error.requestID).to.equal(undefined);
    }
  });

  it("Throws a server-side 429 error if the rate limit is exceeded", async function () {
    // This case runs a little long for some reason
    this.timeout(15000);

    let carrierName = "amazon_buy_shipping";

    const shipengine = new ShipEngine({ apiKey, baseURL });

    try {
      await shipengine.getCarrierAccounts(carrierName);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "RateLimitExceededError",
        source: "shipengine",
        type: "system",
        code: "rate_limit_exceeded",
        message: "You have exceeded the rate limit.",
      });
      expect(error.requestID).to.match(/^req_\w+$/);
    }
  });
});

const accountData = [
  {
    id: "car_1knseddGBrseWTiw",
    carrier: {
      name: "United Parcel Service",
      code: "ups",
    },
    accountNumber: "1169350",
    name: "My UPS Account",
  },
  {
    id: "car_kfUjTZSEAQ8gHeT",
    carrier: {
      name: "Federal Express",
      code: "fedex",
    },
    accountNumber: "41E-4928-29314AAX",
    name: "FedEx Account #1",
  },
  {
    id: "car_3a76b06902f812d14b33d6847",
    carrier: {
      name: "Federal Express",
      code: "fedex",
    },
    accountNumber: "41E-4911-851657ABW",
    name: "FedEx Account #2",
  },
  {
    id: "car_4b8hb06902f812d14b88d682n",
    carrier: {
      name: "United States Postal Service",
      code: "usps",
    },
    accountNumber: "46-751-342556",
    name: "My USPS Account",
  },
  {
    id: "car_d1dcrTN3c86Wpcfd82d161",
    carrier: {
      name: "United States Postal Service",
      code: "stamps_com",
    },
    accountNumber: "U-71297853228.125.1",
    name: "My Stamps.com Account",
  },
];

function getAccountData(account) {
  for (let a of accountData) {
    if (a.id === account.id) {
      return a;
    }
  }
}

function assertAccountsMatch(accounts) {
  for (let a of accounts) {
    const matchedAccount = getAccountData(a);
    expect(matchedAccount).to.deep.equals(a);
  }
}

function assertAccountFormat(accounts) {
  for (let a of accounts) {
    expect(a)
        .to.be.an("object")
        .with.keys("id", "carrier", "accountNumber", "name");
    expect(a.id).to.be.a("string");
    expect(a.carrier).to.be.an("object").and.with.keys("name", "code");
    // Optional
    expect(a.carrier.name).to.be.a("string");
    expect(a.carrier.code).to.be.a("string").and.not.to.equal("");
    expect(a.accountNumber).to.be.a("string").and.not.to.equal("");
    // All accounts have an account name
    expect(a.name).to.be.a("string").and.not.to.equal("");
  }
}

function assertUniqueIds(accounts) {
  // A Set can only contain unique values. If the lengths
  // are unequal then some array values could not be inserted in to the Set
  // because those values already existed, hence we have an error

  let accountIds = [];
  for (const a of accounts) {
    accountIds.push(a.id);
  }

  // eslint-disable-next-line no-undef
  let accountSet = new Set(accountIds);

  if (accountSet.size !== accounts.length) {
    assert.fail("Results included duplicate account ids.");
  }
}

function assertCarrierIdFormat(accounts) {
  for (let a of accounts) {
    expect(a.id).to.match(/^car_\w+$/);
  }
}
