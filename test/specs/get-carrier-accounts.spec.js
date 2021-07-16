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
  }).timeout(5000);

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
  }).timeout(5000);

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
  }).timeout(5000);

  it("Throws a server-side error", async () => {
    const carrierName = "access_worldwide";

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
  }).timeout(5000);

  it("Throws an client-side error if an invalid carrierCode is passed", async () => {
    const carrierName = "my_carrier";

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
  }).timeout(5000);

  it("Throws a server-side 429 error if the rate limit is exceeded", async () => {
    const carrierName = "amazon_buy_shipping";

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
  }).timeout(5000);

  it("Does not attempt a retry on a server side error when retries is set to 0 in the config", async () => {
    const carrierName = "amazon_buy_shipping";

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

      // Each event should have triggered only once
      sinon.assert.calledOnce(requestSent);
      sinon.assert.calledOnce(responseReceived);

      // The first request and response events both have retry 0
      expect(requestSent.getCall(0).firstArg.retry).to.equal(0);
      expect(responseReceived.getCall(0).firstArg.retry).to.equal(0);
    }
  }).timeout(5000);

  it("Attempts the custom number of retries on a server side error", async () => {
    let carrierName = "amazon_buy_shipping";

    const shipengine = new ShipEngine({ apiKey, baseURL, retries: 3 });
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

      // Each event should have triggered 4 times
      sinon.assert.callCount(requestSent, 4);
      sinon.assert.callCount(responseReceived, 4);

      // Check that the retry is increasing by 1 for each request
      for (let i = 0; i < 3; i++) {
        expect(requestSent.getCall(0).firstArg.retry).to.equal(0);
        expect(responseReceived.getCall(0).firstArg.retry).to.equal(0);
      }
    }
  }).timeout(10000);

  it("It waits the correct amount of time to retry a failed network call", async () => {
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

      // Each event should have triggered 2 time
      sinon.assert.callCount(requestSent, 2);
      sinon.assert.callCount(responseReceived, 2);

      const firstRequestTime = requestSent.getCall(0).firstArg.timestamp;
      const secondRequestTime = requestSent.getCall(1).firstArg.timestamp;

      expect(secondRequestTime - firstRequestTime).to.be.at.least(2000);

      // Check that the retry is increasing by 1 for each request
      expect(requestSent.getCall(0).firstArg.retry).to.equal(0);
      expect(responseReceived.getCall(0).firstArg.retry).to.equal(0);

      // Check that the retry is increasing by 1 for each request
      expect(requestSent.getCall(1).firstArg.retry).to.equal(1);
      expect(responseReceived.getCall(1).firstArg.retry).to.equal(1);
    }
  }).timeout(20000);
});

const accountData = [
  {
    id: "car_76wyerZpiMKUHAdiDiBS5kU29tZU9u",
    carrier: {
      name: "United Parcel Service",
      code: "ups",
    },
    accountNumber: "1169350",
    name: "My UPS Account",
  },
  {
    id: "car_41GrQHn5uouiPZc2TNE6PU29tZU9ud",
    carrier: {
      name: "Federal Express",
      code: "fedex",
    },
    accountNumber: "41E-4928-29314AAX",
    name: "FedEx Account #1",
  },
  {
    id: "car_Mg6nuNd6M8nuHKcKHD6UDGURvw9xh3",
    carrier: {
      name: "Federal Express",
      code: "fedex",
    },
    accountNumber: "41E-4911-851657ABW",
    name: "FedEx Account #2",
  },
  {
    id: "car_N5Xhzj3r8TkmRkS1NAGYFbX5AbrQq4",
    carrier: {
      name: "United States Postal Service",
      code: "usps",
    },
    accountNumber: "46-751-342556",
    name: "My USPS Account",
  },
  {
    id: "car_UCDpbvfiQnJxEt5KryX75i3qFeCPi8",
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
