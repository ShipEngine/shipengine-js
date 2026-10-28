import { ShipEngine } from "shipengine-sdk";
import { apiKey } from "../utils/constants.js";
import errors from "../utils/errors.js";
import fetchMock from "../utils/fetch-mock.js";

import {
  mockTrackByLabelId200,
  mockTrackByLabelId404,
  mockTrackByLabelId500,
} from "../utils/mocks/mock-track-by-label-id-200.js";

describe("trackUsingLabelId()", () => {
  it("should throw an error if the label ID is not a string", async () => {
    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.trackUsingLabelId(1234);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertInvalidFieldValueError(error, {
        code: "invalid_field_value",
        fieldName: "labelId",
        message: "labelId must be a string.",
        name: "InvalidFieldValueError",
        source: "shipengine",
        type: "validation",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("should throw an error if the label ID is a dot-segment", async () => {
    const shipengine = new ShipEngine({ apiKey });

    for (const labelId of [".", ".."]) {
      try {
        await shipengine.trackUsingLabelId(labelId);
        errors.shouldHaveThrown();
      } catch (error) {
        errors.assertInvalidFieldValueError(error, {
          code: "invalid_field_value",
          fieldName: "labelId",
          fieldValue: labelId,
          message: "labelId is not a valid label ID.",
          name: "InvalidFieldValueError",
          source: "shipengine",
          type: "validation",
        });
      }
    }
  });

  it("should URL-encode the label ID", async () => {
    fetchMock.getOnce(
      "https://api.shipengine.com/v1/labels/..%2Ftracking%3Fcarrier_code%3Dx%26tracking_number%3Dy%23/track",
      { events: [] }
    );

    const shipengine = new ShipEngine({ apiKey });
    await shipengine.trackUsingLabelId(
      "../tracking?carrier_code=x&tracking_number=y#"
    );

    expect(fetchMock.callHistory.done()).to.be.true;
    fetchMock.restore();
  });

  it("Throws an error if the request returns a 404", async () => {
    mockTrackByLabelId404();

    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.trackUsingLabelId("se-1234");
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "security",
        code: "not_found",
        message: "GET",
      });

      // TODO: surface the request ID in the error??
      expect(error.requestID).to.equal("594a0d7d-5905-48ef-bb89-93acea737b3a");
    }

    fetchMock.restore();
  });

  it("Throws an error if the request returns a 500", async () => {
    mockTrackByLabelId500();

    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.trackUsingLabelId("se-1234");
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message: "An unknown error occurred while calling the ShipEngine API.",
      });

      // TODO: surface the request ID in the error??
      expect(error.requestId).to.be.undefined;
      // expect(error.requestId).to.equal("123456789132456789123465789");
    }

    fetchMock.restore();
  });

  it("should return tracking information for a valid Label ID", async () => {
    mockTrackByLabelId200();

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.trackUsingLabelId("se-1234");

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

    fetchMock.restore();
  });
});
