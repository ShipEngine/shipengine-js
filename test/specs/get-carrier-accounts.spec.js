const { expect, assert } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");
const sinon = require("sinon");

describe("getCarrierAccounts()", async () => {
  it("Returns an empty array if no accounts are setup yet", async () => {
    let response;
    const carrierName = "royal_mail";

    const shipengine = new ShipEngine({ apiKey, baseURL });
    shipengine.clearCache();

    try {
      response = await shipengine.getCarrierAccounts(carrierName);
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }
    expect(response).to.eql([]);
  });

  it("Returns multiple accounts for different carriers", async () => {
    let accounts;

    const shipengine = new ShipEngine({ apiKey, baseURL });
    shipengine.clearCache();

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

  it("Returns multiple accounts for the same carrier", async () => {
    let accounts;
    let carrierCode = "fedex";

    const shipengine = new ShipEngine({ apiKey, baseURL });
    shipengine.clearCache();

    try {
      accounts = await shipengine.getCarrierAccounts(carrierCode);
    } catch (e) {
      assert.fail(`Did not expect an error to be thrown: ${e.message}`);
    }

    // The list contains the expected number of carrier accounts
    expect(accounts).to.be.an("array").and.lengthOf(2);

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

  it("Throws a server-side error", async () => {
    let carrierName = "access_worldwide";

    const shipengine = new ShipEngine({ apiKey, baseURL });
    shipengine.clearCache();

    try {
      await shipengine.getCarrierAccounts(carrierName);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message:
          "Unable to process this request. A downstream API error occurred.",
      });
      expect(error.requestID).to.match(/^req_\w+$/);
    }
  });

  it("Throws an client-side error if an invalid carrierCode is passed", async () => {
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

  it("Throws a server-side 429 error if the rate limit is exceeded", async () => {
    let carrierName = "amazon_buy_shipping";

    const shipengine = new ShipEngine({ apiKey, baseURL });
    shipengine.clearCache();

    const requestSent = sinon.spy();
    const responseReceived = sinon.spy();
    shipengine.on("requestSent", requestSent);
    shipengine.on("responseReceived", responseReceived);

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
      expect(error.url.href).to.equal(
        "https://www.shipengine.com/docs/rate-limits"
      );

      // Each event should have triggered twice
      sinon.assert.calledTwice(requestSent);
      sinon.assert.calledTwice(responseReceived);

      // The first request and response events both have retry 0
      expect(requestSent.getCall(0).firstArg.retry).to.equal(0);
      expect(responseReceived.getCall(0).firstArg.retry).to.equal(0);

      // The second request and response events both have retry 1
      expect(requestSent.getCall(1).firstArg.retry).to.equal(1);
      expect(responseReceived.getCall(1).firstArg.retry).to.equal(1);
    }
  });

  it("Does not attempt a retry on a server side error when retries is set to 0 in the config", async () => {
    let carrierName = "amazon_buy_shipping";

    const shipengine = new ShipEngine({ apiKey, baseURL, retries: 0 });
    shipengine.clearCache();

    const requestSent = sinon.spy();
    const responseReceived = sinon.spy();
    shipengine.on("requestSent", requestSent);
    shipengine.on("responseReceived", responseReceived);

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
      expect(error.url.href).to.equal(
        "https://www.shipengine.com/docs/rate-limits"
      );

      // Each event should have triggered twice
      sinon.assert.calledOnce(requestSent);
      sinon.assert.calledOnce(responseReceived);

      // The first request and response events both have retry 0
      expect(requestSent.getCall(0).firstArg.retry).to.equal(0);
      expect(responseReceived.getCall(0).firstArg.retry).to.equal(0);
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
