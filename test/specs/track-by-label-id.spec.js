const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");

const {
  mockTrackByLabelId200,
} = require("../utils/mocks/mock-track-by-label-id-200");

describe("trackByLabelId()", () => {
  it("should throw an error if the label ID is not a string", async () => {
    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.trackByLabelId({ labelId: 1234 });
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
  //     const result = await shipengine.trackByLabelId({
  //       LabelId: "se-1234",
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
    mockTrackByLabelId200();

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.trackByLabelId({
      labelId: "se-1234",
    });

    expect(result).to.deep.equal({
      trackingNumber: "332980205337",
      statusCode: "DE",
      statusDescription: "Delivered",
      carrierStatusCode: "Delivery",
      carrierDetailCode: null,
      carrierStatusDescription: "Shipment delivered",
      shipDate: null,
      estimatedDeliveryDate: null,
      actualDeliveryDate: "2021-06-17T05:04:39Z",
      exceptionDescription: null,
      events: [
        {
          occurredAt: "2021-07-23T12:42:00Z",
          carrierOccurredAt: "2021-07-23T07:42:00",
          description: "Out for Delivery, Expected Delivery by 9:00pm",
          cityLocality: "MCKINNEY",
          stateProvince: "TX",
          postalCode: "75071",
          countryCode: null,
          companyName: null,
          signer: null,
          eventCode: "OF",
          statusCode: null,
          carrierStatusCode: "OF",
          carrierDetailCode: null,
          latitude: 33.175,
          longitude: -96.6986,
        },
        {
          occurredAt: "2021-07-23T12:31:00Z",
          carrierOccurredAt: "2021-07-23T07:31:00",
          description: "Arrived at Post Office",
          cityLocality: "MCKINNEY",
          stateProvince: "TX",
          postalCode: "75070",
          countryCode: null,
          companyName: null,
          signer: null,
          eventCode: "07",
          statusCode: null,
          carrierStatusCode: "07",
          carrierDetailCode: null,
          latitude: 33.175,
          longitude: -96.6986,
        },
      ],
    });
  });
});
