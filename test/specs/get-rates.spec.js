const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");
const fetchMock = require("../utils/fetch-mock");

describe("getRates()", () => {
  it("Returns rates on a successful request", async () => {
    fetchMock.post("https://api.shipengine.com/v1/rates", {
      approved: true,
      message: "This label has been voided.",
    });

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.getRates("se-451990109");

    expect(result).to.deep.equal({
      approved: true,
      message: "This label has been voided.",
    });

    fetchMock.restore();
  });

  it("Throws an error if the ID provided does not exist", async () => {
    fetchMock.postOnce("https://api.shipengine.com/v1/rates", {
      status: 404,
      body: {
        request_id: "fd4db077-dc7f-4866-a41e-c24f15c53fac",
        errors: [
          {
            error_source: "shipengine",
            error_type: "system",
            error_code: "unspecified",
            message: "Label ID se-invalid was not found.",
          },
        ],
      },
    });

    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.getRates("invalid");
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message: "Label ID se-invalid was not found.",
      });

      expect(error.requestId).to.be.undefined;
    }

    fetchMock.restore();
  });

  it("Throws an error if the ID provided is not a string", async () => {
    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.getRates();
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertInvalidFieldValueError(error, {
        code: "invalid_field_value",
        fieldName: "ID",
        message: "ID must be a string.",
        name: "InvalidFieldValueError",
        source: "shipengine",
        type: "validation",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Throws an error if the request returns a 500", async () => {
    fetchMock.post("https://api.shipengine.com/v1/rates", {
      status: 500,
      body: {
        request_id: "123456789132456789123465789",
        error: {
          message: "Something bad happened",
        },
      },
    });

    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.getRates("se-451990109");
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message: "An unknown error occurred while calling the ShipEngine API.",
      });

      expect(error.requestId).to.be.undefined;
    }

    fetchMock.restore();
  });
});
