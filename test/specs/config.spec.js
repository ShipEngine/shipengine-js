"use strict";

const { ShipEngine } = require("../..");
const { expect } = require("chai");
const errors = require("../utils/errors");
const { apiKey } = require("../utils/constants");

describe("Configuration", () => {
  describe("at instantiation", () => {
    it("should allow the config to just be the API key", () => {
      const shipengine = new ShipEngine("my api key");
      expect(shipengine.config.apiKey).to.equal("my api key");
    });

    it("should allow the config to be an object with an API key", () => {
      const shipengine = new ShipEngine({ apiKey: "my api key" });
      expect(shipengine.config.apiKey).to.equal("my api key");
    });

    it("should allow the config to be an object with multiple config settings", () => {
      const shipengine = new ShipEngine({
        apiKey: "my api key",
        baseURL: "http://example.com/foo?bar",
        pageSize: 100,
        retries: 5,
        timeout: 30000,
      });
      expect(shipengine.config.apiKey).to.equal("my api key");
      expect(shipengine.config.baseURL).to.deep.equal(
        new URL("http://example.com/foo?bar")
      );
      expect(shipengine.config.pageSize).to.equal(100);
      expect(shipengine.config.retries).to.equal(5);
      expect(shipengine.config.timeout).to.equal(30000);
    });

    it("should throw an error if no config is specified", () => {
      try {
        new ShipEngine();
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertShipEngineError(error, {
          name: "ShipEngineError",
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "A ShipEngine API key must be specified.",
        });
      }
    });

    it("should throw an error if an empty API key is specified", () => {
      try {
        new ShipEngine("");
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertShipEngineError(error, {
          name: "ShipEngineError",
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "A ShipEngine API key must be specified.",
        });
      }
    });

    it("should throw an error if a whitespace API key is specified", () => {
      try {
        new ShipEngine("  \n\t  ");
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertShipEngineError(error, {
          name: "ShipEngineError",
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "A ShipEngine API key must be specified.",
        });
      }
    });

    it("should throw an error if a non-string API key is specified", () => {
      try {
        new ShipEngine({ apiKey: 42 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "invalid_field_value",
          message: "API Key must be a string.",
          fieldName: "API Key",
          fieldValue: 42,
        });
      }
    });

    it("should allow retries to be zero", () => {
      const shipengine = new ShipEngine({ apiKey, retries: 0 });
      expect(shipengine.config.retries).to.equal(0);
    });

    it("should throw an error if retries is a negative number", () => {
      try {
        new ShipEngine({ apiKey, retries: -42 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "Retries must be zero or greater.",
          fieldName: "Retries",
          fieldValue: -42,
        });
      }
    });

    it("should throw an error if timeout is zero", () => {
      try {
        new ShipEngine({ apiKey, timeout: 0 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "Timeout must be greater than zero.",
          fieldName: "Timeout",
          fieldValue: 0,
        });
      }
    });

    it("should throw an error if timeout is a negative number", () => {
      try {
        new ShipEngine({ apiKey, timeout: -42 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "Timeout must be greater than zero.",
          fieldName: "Timeout",
          fieldValue: -42,
        });
      }
    });
  });

  describe("in method call", () => {
    const dummyAddress = {
      street: "4 Jersey St",
      postalCode: "02215",
      country: "US",
    };

    it("should throw an error if the config is just an API key string", async () => {
      const shipengine = new ShipEngine({ apiKey: "original API key" });

      try {
        await shipengine.validateAddresses(dummyAddress, "new API key");
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "invalid_field_value",
          message: "Config must be an object.",
          fieldName: "Config",
          fieldValue: "new API key",
        });
      }
    });

    it("should throw an error if an empty API key is specified", async () => {
      const shipengine = new ShipEngine({ apiKey: "original API key" });

      try {
        await shipengine.validateAddresses(dummyAddress, { apiKey: "" });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertShipEngineError(error, {
          name: "ShipEngineError",
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "A ShipEngine API key must be specified.",
        });
      }
    });

    it("should throw an error if a whitespace API key is specified", async () => {
      const shipengine = new ShipEngine({ apiKey: "original API key" });

      try {
        await shipengine.validateAddresses(dummyAddress, {
          apiKey: "  \n\t  ",
        });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertShipEngineError(error, {
          name: "ShipEngineError",
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "A ShipEngine API key must be specified.",
        });
      }
    });

    it("should throw an error if a non-string API key is specified", async () => {
      const shipengine = new ShipEngine({ apiKey: "original API key" });

      try {
        await shipengine.validateAddresses(dummyAddress, { apiKey: 42 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "invalid_field_value",
          message: "API Key must be a string.",
          fieldName: "API Key",
          fieldValue: 42,
        });
      }
    });

    it("should throw an error if timeout is zero", async () => {
      const shipengine = new ShipEngine({ apiKey: "original API key" });

      try {
        await shipengine.validateAddresses(dummyAddress, { timeout: 0 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "Timeout must be greater than zero.",
          fieldName: "Timeout",
          fieldValue: 0,
        });
      }
    });

    it("should throw an error if timeout is a negative number", async () => {
      const shipengine = new ShipEngine({ apiKey: "original API key" });

      try {
        await shipengine.validateAddresses(dummyAddress, { timeout: -42 });
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          source: "shipengine",
          type: "validation",
          code: "field_value_required",
          message: "Timeout must be greater than zero.",
          fieldName: "Timeout",
          fieldValue: -42,
        });
      }
    });
  });
});
