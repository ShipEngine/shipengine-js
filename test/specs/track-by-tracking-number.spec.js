const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");

const {
  mockTrackByTrackingNumber200,
} = require("../utils/mocks/mock-track-by-tracking-number-200");

describe("trackByTrackingNumber()", () => {
  it("should throw an error if the carrier code is not a string", async () => {
    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.trackByTrackingNumber({
        carrierCode: 1234,
        trackingNumber: "1234",
      });
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertInvalidFieldValueError(error, {
        code: "invalid_field_value",
        fieldName: "Params",
        message: "Params must be a string.",
        name: "InvalidFieldValueError",
        source: "shipengine",
        type: "validation",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("should throw an error if the tracking number is not a string", async () => {
    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.trackByTrackingNumber({
        carrierCode: "1234",
        trackingNumber: 1234,
      });
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertInvalidFieldValueError(error, {
        code: "invalid_field_value",
        fieldName: "Params",
        message: "Params must be a string.",
        name: "InvalidFieldValueError",
        source: "shipengine",
        type: "validation",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  // it("should throw an error when the label ID does not exist", async () => {
  //   fetchMock.get("https://api.shipengine.com/v1/labels/se-1234/track", {
  //     status: 404,
  //     body: {
  //       request_id: "c2a2d543-0c1b-4876-9171-af56b623f848",
  //       errors: [
  //         {
  //           error_source: "shipengine",
  //           error_type: "security",
  //           error_code: "not_found",
  //           message: "GET",
  //           method: "/v1/labels/se-1234/track",
  //           path: "GET /v1/labels/se-1234/track is not a valid API endpoint.",
  //         },
  //       ],
  //     },
  //   });

  //   const shipengine = new ShipEngine({ apiKey });

  //   try {
  //     const result = await shipengine.trackByTrackingNumber({
  //       carrierCode: "se-1234",
  //     });
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertInvalidFieldValueError(error, {
  //       code: "invalid_field_value",
  //       fieldName: "Params",
  //       message: "Params must be a valid label id.",
  //       name: "InvalidFieldValueError",
  //       source: "shipengine",
  //       type: "validation",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  it("should return tracking information for a valid Label ID", async () => {
    mockTrackByTrackingNumber200();

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.trackByTrackingNumber({
      carrierCode: "stamps_com",
      trackingNumber: "1234",
    });

    expect(result.trackingNumber).to.equal("332980205337");
    expect(result.statusCode).to.equal("DE");
    expect(result.statusDescription).to.equal("Delivered");
    expect(result.carrierStatusCode).to.equal("Delivery");
    expect(result.carrierDetailCode).to.equal("");
    expect(result.carrierStatusDescription).to.equal("Shipment delivered");
    expect(result.shipDate).to.equal("");
    expect(result.estimatedDeliveryDate).to.equal("");
    expect(result.actualDeliveryDate).to.equal("2021-06-17T05:04:39Z");
    expect(result.exceptionDescription).to.equal("");

    expect(result.events).to.have.lengthOf(2);

    expect(result.events[0].occurredAt).to.equal("2021-07-23T12:42:00Z");
    expect(result.events[0].carrierOccurredAt).to.equal("2021-07-23T07:42:00");
    expect(result.events[0].description).to.equal(
      "Out for Delivery, Expected Delivery by 9:00pm"
    );
    expect(result.events[0].cityLocality).to.equal("MCKINNEY");
    expect(result.events[0].stateProvince).to.equal("TX");
    expect(result.events[0].postalCode).to.equal("75071");
    expect(result.events[0].countryCode).to.equal("");
    expect(result.events[0].companyName).to.equal("");
    expect(result.events[0].signer).to.equal("");
    expect(result.events[0].eventCode).to.equal("OF");
    expect(result.events[0].carrierDetailCode).to.equal("");
    expect(result.events[0].statusCode).to.equal("");
    expect(result.events[0].carrierStatusCode).to.equal("OF");
    expect(result.events[0].latitude).to.equal(33.175);
    expect(result.events[0].longitude).to.equal(-96.6986);

    expect(result.events[1].occurredAt).to.equal("2021-07-23T12:31:00Z");
    expect(result.events[1].carrierOccurredAt).to.equal("2021-07-23T07:31:00");
    expect(result.events[1].description).to.equal("Arrived at Post Office");
    expect(result.events[1].cityLocality).to.equal("MCKINNEY");
    expect(result.events[1].stateProvince).to.equal("TX");
    expect(result.events[1].postalCode).to.equal("75070");
    expect(result.events[1].countryCode).to.equal("");
    expect(result.events[1].companyName).to.equal("");
    expect(result.events[1].signer).to.equal("");
    expect(result.events[1].eventCode).to.equal("07");
    expect(result.events[1].carrierDetailCode).to.equal("");
    expect(result.events[1].statusCode).to.equal("");
    expect(result.events[1].carrierStatusCode).to.equal("07");
    expect(result.events[1].latitude).to.equal(33.175);
    expect(result.events[1].longitude).to.equal(-96.6986);
  });
});
