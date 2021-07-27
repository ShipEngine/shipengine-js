const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");
const fetchMock = require("../utils/fetch-mock");

describe("voidLabelById()", () => {
  it("Returns a success message", async () => {
    fetchMock.put("https://api.shipengine.com/v1/labels/se-451990109/void", {
      approved: true,
      message: "This label has been voided.",
    });

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.voidLabelById("se-451990109");

    expect(result).to.deep.equal({
      approved: true,
      message: "This label has been voided.",
    });

    fetchMock.restore();
  });

  // TODO - implement this once we handle 404s globally
  it.skip("Throws an error if the ID provided does not exist", async () => {
    fetchMock.putOnce("https://api.shipengine.com/v1/labels/invalid/void", {
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
      await shipengine.voidLabelById("invalid");
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

    fetchMock.restore();
  });

  it("Throws an error if the ID provided is not a string", async () => {
    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.voidLabelById();
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
});
