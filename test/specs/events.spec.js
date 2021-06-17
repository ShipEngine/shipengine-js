"use strict";

const { ShipEngine } = require("../../");
const { expect } = require("chai");
const sinon = require("sinon");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("Events", function () {
  this.timeout(5000);

  it("should emit request/response events for a successful API call", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    // Subscribe to the request/response events
    const requestSent = sinon.spy();
    const responseReceived = sinon.spy();
    shipengine.on("requestSent", requestSent);
    shipengine.on("responseReceived", responseReceived);

    // Call a method that should trigger a single request & response
    await shipengine.validateAddress({
      street: "4 Jersey St.",
      cityLocality: "Boston",
      stateProvince: "MA",
      country: "US",
    });

    // Each event should have triggered once
    sinon.assert.calledOnce(requestSent);
    sinon.assert.calledOnce(responseReceived);

    // Each event should have received a single argument
    sinon.assert.calledWithExactly(requestSent, sinon.match.object);
    sinon.assert.calledWithExactly(responseReceived, sinon.match.object);

    // Make sure the event arguments match our expectations
    assertRequestEvent(requestSent.firstCall.firstArg);
    assertResponseEvent(responseReceived.firstCall.firstArg);
  });

  it("should emit request/response events for a failed API call", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });

    // Subscribe to the request/response events
    const requestSent = sinon.spy();
    const responseReceived = sinon.spy();
    shipengine.on("requestSent", requestSent);
    shipengine.on("responseReceived", responseReceived);

    try {
      // Call a method that should trigger a single request & an error response
      await shipengine.validateAddress({
        street: "RPC Server Error",
        cityLocality: "Boston",
        stateProvince: "MA",
        country: "US",
      });
    } catch (e) {
      // We don't care about the error for this test
    }

    // Each event should have triggered once
    sinon.assert.calledOnce(requestSent);
    sinon.assert.calledOnce(responseReceived);

    // Each event should have received a single argument
    sinon.assert.calledWithExactly(requestSent, sinon.match.object);
    sinon.assert.calledWithExactly(responseReceived, sinon.match.object);

    // Make sure the event arguments match our expectations
    assertRequestEvent(requestSent.firstCall.firstArg);
    // Unless there is a 500 error, this API always returns 200
    assertResponseEvent(responseReceived.firstCall.firstArg, 200);
  });

  it("DX-1544 - retry > timeout - If the 429 retry value is greater than the configured timeout, we timeout rather than wait", async () => {
    // 429 retry is 5000
    const config = {
      timeout: 4000,
      apiKey: apiKey,
      baseURL: baseURL,
    };
    const shipengine = new ShipEngine(config);

    // Subscribe to the request/response events
    const requestSent = sinon.spy();
    const responseReceived = sinon.spy();
    shipengine.on("requestSent", requestSent);
    shipengine.on("responseReceived", responseReceived);

    try {
      // Call a method that should trigger a single request & an error response
      const response = await shipengine.validateAddress({
        street: "429 Rate Limit Error",
        cityLocality: "Boston",
        stateProvince: "MA",
        country: "US",
      });
      console.log(response);
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "RateLimitExceededError",
        source: "shipengine",
        type: "system",
        code: "timeout",
        url: "https://www.shipengine.com/docs/rate-limits",
        message: "Invalid address. At least one address line is required.",
      });
    }

    // Each event should have triggered once
    sinon.assert.calledTwice(requestSent);
    sinon.assert.calledTwice(responseReceived);

    // Each event should have received a single argument
    sinon.assert.calledWithExactly(requestSent, sinon.match.object);
    sinon.assert.calledWithExactly(responseReceived, sinon.match.object);

    // Make sure the event arguments match our expectations
    assertRequestEvent(requestSent.firstCall.firstArg, 0, 4000);
    // Unless there is a 500 error, this API always returns 200
    assertResponseEvent(responseReceived.firstCall.firstArg, 429);
  });
});

/**
 * Asserts that the RequestSent event arg is valid
 */
function assertRequestEvent(event, retry = 0, timeout = 5000) {
  expect(event)
    .to.be.an("object")
    .with.keys(
      "timestamp",
      "type",
      "message",
      "requestID",
      "url",
      "headers",
      "body",
      "retry",
      "timeout"
    );
  expect(event.timestamp)
    .to.be.a("date")
    .greaterThan(new Date(Date.now() - timeout))
    .lessThan(new Date());
  expect(event.type).to.equal("requestSent");
  expect(event.message).to.equal(
    `Calling the ShipEngine address.validate.v1 API at ${baseURL}`
  );
  expect(event.requestID).to.match(/^req_\w+$/);
  expect(event.url).to.be.an.instanceOf(URL).with.property("href", baseURL);
  expect(event.headers)
    .to.be.an("object")
    .with.keys("Accept", "API-Key", "User-Agent", "Content-Type");
  expect(event.headers["API-Key"]).to.be.a("string").and.not.empty;
  expect(event.headers["User-Agent"]).to.be.a("string").and.not.empty;
  expect(event.headers["Content-Type"]).to.equal("application/json");
  expect(event.body)
    .to.be.an("object")
    .with.keys("jsonrpc", "id", "method", "params");
  expect(event.body.jsonrpc).to.equal("2.0");
  expect(event.body.id).to.equal(event.requestID);
  expect(event.body.method).to.equal("address.validate.v1");
  expect(event.body.params).to.be.an("object").with.keys("address");
  expect(event.retry).to.be.a("number").and.equal(retry);
  expect(event.timeout).to.be.a("number").and.equal(timeout);
}

/**
 * Asserts that the ResponseReceived event arg is valid
 */
function assertResponseEvent(
  event,
  statusCode = 200,
  retry = 0,
  timeout = 5000
) {
  expect(event)
    .to.be.an("object")
    .with.keys(
      "timestamp",
      "type",
      "message",
      "requestID",
      "url",
      "statusCode",
      "headers",
      "body",
      "retry",
      "elapsed"
    );
  expect(event.timestamp)
    .to.be.a("date")
    .greaterThan(new Date(Date.now() - timeout))
    .lessThan(new Date());
  expect(event.type).to.equal("responseReceived");
  expect(event.message).to.equal(
    `Received an HTTP ${statusCode} response from the ShipEngine address.validate.v1 API.`
  );
  expect(event.requestID).to.match(/^req_\w+$/);
  expect(event.url).to.be.an.instanceOf(URL).with.property("href", baseURL);
  expect(event.statusCode).to.be.a("number").and.equal(statusCode);
  expect(event.headers).to.be.an("object").and.not.empty;
  expect(event.body).to.be.an("object").and.include.keys("jsonrpc", "id");
  expect(event.body.jsonrpc).to.equal("2.0");
  expect(event.body.id).to.equal(event.requestID);
  expect(event.retry).to.be.a("number").and.equal(retry);
  expect(event.elapsed).to.be.a("number").lessThan(timeout);

  // Changed since 429 does not produce an error
  if (statusCode === 400 || statusCode === 500) {
    expect(event.body.error)
      .to.be.an("object")
      .with.keys("code", "message", "data");
    expect(event.body.error.data)
      .to.be.an("object")
      .with.keys("source", "type", "code");
    // 429 events won't have a result
  } else if (statusCode !== 429) {
    expect(event.body.result)
      .to.be.an("object")
      .with.keys("isValid", "normalizedAddress", "messages");
  }
}
