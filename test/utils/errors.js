"use strict";

const { expect } = require("chai");
const { ShipEngineError } = require("../../");

/**
 * Helper functions for testing errors
 */
const errors = (module.exports = {
  /**
   * A helper function that you can put in your test at a point that should not
   * actually be reached because an error should have been thrown.  This prevents
   * tests from "passing" because they didn't throw an error like you expected.
   */
  shouldHaveThrown() {
    throw new Error("Expected an error to be thrown, but no error was thrown.");
  },

  /**
   * Asserts that an error is a valid FieldValueRequiredError with the expected values
   */
  assertFieldValueRequiredError(error, props) {
    props.name = "FieldValueRequiredError";
    props.type = "validation";
    props.code = "field_value_required";

    errors.assertShipEngineError(error, props);

    expect(error.fieldName)
      .to.be.a("string")
      .equal(props.fieldName)
      .with.length.above(0);
  },

  /**
   * Asserts that an error is a valid InvalidFieldValueError with the expected values
   */
  assertInvalidFieldValueError(error, props) {
    props.name = "InvalidFieldValueError";
    props.type = "validation";
    props.code = "invalid_field_value";

    errors.assertShipEngineError(error, props);

    expect(error.fieldName)
      .to.be.a("string")
      .equal(props.fieldName)
      .with.length.above(0);
    expect(error).to.include.keys("fieldValue");
    expect(error.fieldValue).to.equal(props.fieldValue);
  },

  /**
   * Asserts that an error is a valid RateLimitExceededError with the expected values
   */
  assertRateLimitExceededError(error, props) {
    props.name = "RateLimitExceededError";
    props.type = "system";
    props.code = "rate_limit_exceeded";

    errors.assertShipEngineError(error, props);

    expect(error.retryAfter).to.be.a("number").equal(props.retryAfter);
  },

  /**
   * Asserts that an error is a valid ShipEngineError with the expected values
   */
  assertShipEngineError(error, props) {
    props.name = props.name || "ShipEngineError";

    expect(error).to.be.an.instanceOf(Error);
    expect(error).to.be.an.instanceOf(ShipEngineError);
    expect(error.name)
      .to.be.a("string")
      .equal(props.name)
      .equal(error.constructor.name)
      .with.length.above(0);
    expect(error.source)
      .to.be.a("string")
      .equal(props.source)
      .with.length.above(0);
    expect(error.type).to.be.a("string").equal(props.type).with.length.above(0);
    expect(error.code).to.be.a("string").equal(props.code).with.length.above(0);

    expect(error.url).to.be.an.instanceOf(URL);
    if (props.url) {
      expect(error.url).to.have.property("href", props.url);
    }

    if ("requestID" in props) {
      expect(error.requestID).to.equal(props.requestID);
    }

    expect(error.message).to.be.a("string").with.length.above(0);
    if (props.message instanceof RegExp) {
      expect(error.message).to.match(props.message);
    } else {
      expect(error.message).to.equal(props.message);
    }
  },
});
