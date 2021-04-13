"use strict";

const { ShipEngine } = require("../../");
const { expect } = require("chai");
const sinon = require("sinon");
const { apiKey, baseURL } = require("../utils/constants");

describe("Events", () => {
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

  it.skip("should emit request/response events for a failed API call", async () => {
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
    assertResponseEvent(responseReceived.firstCall.firstArg, 400);
  });

  it.skip("should emit request/response events for a retried API call", async () => {
    // TODO
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
    `Calling the ShipEngine address/validate API at ${baseURL}`
  );
  expect(event.requestID).to.match(/^req_\w+$/);
  expect(event.url).to.be.an.instanceOf(URL).with.property("href", baseURL);
  expect(event.headers)
    .to.be.an("object")
    .with.keys("API-Key", "User-Agent", "Content-Type");
  expect(event.headers["API-Key"]).to.be.a("string").and.not.empty;
  expect(event.headers["User-Agent"]).to.be.a("string").and.not.empty;
  expect(event.headers["Content-Type"]).to.equal("application/json");
  expect(event.body)
    .to.be.an("object")
    .with.keys("jsonrpc", "id", "method", "params");
  expect(event.body.jsonrpc).to.equal("2.0");
  expect(event.body.id).to.equal(event.requestID);
  expect(event.body.method).to.equal("address/validate");
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
    `Received an HTTP ${statusCode} response from the ShipEngine address/validate API.`
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

  if (statusCode >= 400) {
    expect(event.body.error)
      .to.be.an("object")
      .with.keys("code", "message", "data");
    expect(event.body.error.data)
      .to.be.an("object")
      .with.keys("source", "type", "code");
  } else {
    expect(event.body.result)
      .to.be.an("object")
      .with.keys("valid", "address", "messages");
  }
}
