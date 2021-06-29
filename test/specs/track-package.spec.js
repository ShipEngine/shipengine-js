const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");
const { getExceptions } = require("../../cjs/track/util");

describe("trackPackage", () => {
  it("DX-1266: Tracks a package using a tracking number and carrier code", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      trackingNumber: "aaaaa_delivered",
      carrierCode: "fedex",
    };
    const response = await shipengine.trackPackage(params);

    expect(response.shipment.carrier.code).to.equal(params.carrierCode);

    expect(response.package.trackingNumber).to.equal(params.trackingNumber);
  });

  it("DX-1268: Tracks a package using a packageId", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedExAttempted",
    };
    const response = await shipengine.trackPackage(params);

    expect(response.package.packageId).to.equal(params.packageId);

    expect(response.shipment.shipmentId).to.be.a("string").and.not.to.equal("");

    expect(response.shipment.carrierId).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");
  });

  it("DX-1270: Tracks a package with an Initial Scan event", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedAccepted",
    };
    const response = await shipengine.trackPackage(params);

    expect(response.shipment.carrier.code)
      .to.be.a("string")
      .and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    expect(response.shipment.estimatedDeliveryDateTime).to.not.equal(undefined);

    expect(response.events).to.have.length(1);

    expect(response.events[0].status).to.equal("accepted");
  });

  it("DX-1271: Tracks a package Out for Delivery", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedAttempted",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    // TODO: Update test to meet this requirement once it is implemented
    // The estimated delivery date is populated and is a full date/time in the UTC time zone
    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(response.events).to.have.length(5);

    expect(response.events[0].status).to.equal("accepted");

    expect(response.events[1].status).to.equal("in_transit");
  });

  it("DX-1272: Tracks a package with multiple delivery attempts", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedexDeLiveredAttempted",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(response.events[0].status).to.equal("accepted");

    expect(response.events[1].status).to.equal("in_transit");

    let numberOfAttemptedDeliveryEvents = 0;
    for (const event of response.events) {
      if (event.status === "attempted_delivery") {
        numberOfAttemptedDeliveryEvents++;
      }
    }

    expect(numberOfAttemptedDeliveryEvents).to.greaterThanOrEqual(2);

    expect(response.events.slice(-1)[0].status).to.equal("delivered");
  });

  it("DX-1273: Tracks a package delivered on the first try", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedExDeLivered",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    const lastEvent = response.events.pop();
    expect(response.shipment.actualDeliveryDateTime).to.deep.equal(
      lastEvent.dateTime
    );

    // TODO Are the events sorted by the server
    // The events array is sorted in ascending order by the UTC date/time (NOT by the carrier date/time field)

    expect(response.events[0].status).to.equal("accepted");

    expect(
      response.events.filter((e) => e.status === "in_transit")
    ).to.have.length.greaterThan(0);

    expect(lastEvent.status === "delivered");
  });

  it("DX-1274: Tracks a package delivered with signature", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedexDeLivered",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment, events } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(shipment.actualDeliveryDateTime).to.deep.equal(events[4].dateTime);

    expect(events).to.have.length(5);
    // TODO Are the events sorted by the server
    // The events array is sorted in ascending order by the UTC date/time (NOT by the carrier date/time field)

    expect(events[0].status).to.equal("accepted");

    expect(events[1].status).to.equal("in_transit");

    expect(events[4].status).to.equal("delivered");

    expect(events[4].signer).to.be.a("string").and.not.to.equal("");
  });

  it("DX-1275: Tracks a package delivered after multiple attempts", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedexDeLiveredAttempted",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment, events } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(shipment.actualDeliveryDateTime).to.deep.equal(
      events.pop().dateTime
    );

    // TODO Are the events sorted by the server
    // The events array is sorted in ascending order by the UTC date/time (NOT by the carrier date/time field)

    expect(events[0].status).to.equal("accepted");

    expect(
      events.filter((e) => e.status === "in_transit")
    ).length.greaterThanOrEqual(1);

    expect(
      events.filter((e) => e.status === "attempted_delivery")
    ).length.greaterThanOrEqual(2);

    expect(events.pop().status === "delivered");
  });

  it("DX-1276: Tracks a package delivered after exception", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedexDeLiveredException",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment, events } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(shipment.actualDeliveryDateTime).to.deep.equal(
      events.pop().dateTime
    );

    // TODO Are the events sorted by the server
    // The events array is sorted in ascending order by the UTC date/time (NOT by the carrier date/time field)

    expect(events[0].status).to.equal("accepted");

    expect(
      events.filter((e) => e.status === "in_transit")
    ).length.greaterThanOrEqual(1);

    expect(
      events.filter((e) => e.status === "exception")
    ).length.greaterThanOrEqual(1);

    expect(events.pop().status === "delivered");
  });

  it("DX-1277: Tracks a package with a single exception", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_1FedexException",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment, events } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(shipment.actualDeliveryDateTime).to.equal(undefined);

    expect(events).to.have.length(3);

    expect(events[0].status).to.equal("accepted");

    expect(
      events.filter((e) => e.status === "in_transit")
    ).length.greaterThanOrEqual(1);

    expect(
      events.filter((e) => e.status === "exception")
    ).length.greaterThanOrEqual(1);
  });

  it("DX-1278: Tracks a package with multiple exceptions", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_DeLiveredException",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment, events } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    expect(events).to.have.length(8);

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    expect(events).to.have.length(8);

    expect(events[0].status).to.equal("accepted");

    expect(
      events.filter((e) => e.status === "exception")
    ).length.greaterThanOrEqual(2);
  });

  it("DX-1279: Tracks a package with multiple events with location info", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_Attempted",
    };
    const response = await shipengine.trackPackage(params);
    const { shipment, events } = response;

    expect(shipment.carrier.code).to.be.a("string").and.not.to.equal("");

    expect(response.package.trackingNumber)
      .to.be.a("string")
      .and.not.to.equal("");

    validateDateTimeFormat(shipment.estimatedDeliveryDateTime);

    // At least one event has no location information (city, state, postal code, or geocoordinates)
    expect(
      events.filter((e) => hasNoLocationData(e) && hasNoCoordinates(e))
    ).to.have.length.greaterThanOrEqual(1);

    // At least one event has a city, state, and postal code, but no geocoordinates
    expect(
      events.filter((e) => !hasNoLocationData(e) && hasNoCoordinates(e))
    ).to.have.length.greaterThanOrEqual(1);

    // At least one event has geocoordinates
    expect(
      events.filter((e) => !hasNoCoordinates(e))
    ).to.have.length.greaterThanOrEqual(1);
  });

  // TODO DX-1280 Tracks a package with event date/time values with no timestamp
  // This has not yet been implemented

  it("DX-1281: Tracks a package with an invalid tracking number", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      trackingNumber: "abc",
      carrierCode: "fedex",
    };

    try {
      await shipengine.trackPackage(params);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "carrier",
        type: "business_rules",
        code: "invalid_identifier",
        message: `${params.trackingNumber} is not a valid ${params.carrierCode} tracking number.`,
      });
      expect(error.requestID).to.match(/^req_\w+$/);
    }
  });

  it("DX-1282: Throws a client-side error for a packageId with an invalid prefix", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "xxx_1FedExAttempted",
    };

    try {
      await shipengine.trackPackage(params);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: "Invalid packageId.",
      });

      expect(error.requestID).to.equal(undefined);
    }
  });

  it("DX-1283: Throws a client-side error for a packageId with an invalid base58-encoded portion of the id", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pgk_mandy",
    };

    try {
      await shipengine.trackPackage(params);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_field_value",
        message: "Invalid packageId.",
      });

      expect(error.requestID).to.equal(undefined);
    }
  });

  it("DX-1284 Tracks a package with a packageId that cannot be found", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      packageId: "pkg_123",
    };

    try {
      await shipengine.trackPackage(params);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "invalid_identifier",
        message: `Package ID ${params.packageId} does not exist.`,
      });
      expect(error.requestID).to.match(/^req_\w+$/);
    }
  });

  it("DX-1285 Tracks a package with server-side error", async () => {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      trackingNumber: "500 Server Error",
      carrierCode: "fedex",
    };

    try {
      await shipengine.trackPackage(params);
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
  });
  it("finds an exception event when it is present", () => {
    const dataCopy = JSON.parse(JSON.stringify(data.events));

    expect(getExceptions(dataCopy)).to.be.an("array").and.to.have.lengthOf(1);
  });
  it("finds multiple exception events when they are present", () => {
    const dataCopy = JSON.parse(JSON.stringify(data.events));

    dataCopy[0].status = "exception";

    expect(getExceptions(dataCopy)).to.be.an("array").and.to.have.lengthOf(2);
  });

  it("returns an empty array when no exception events are present", () => {
    const dataCopy = JSON.parse(JSON.stringify(data.events));

    dataCopy[2].status = "delivered";

    expect(getExceptions(dataCopy)).to.be.an("array").and.to.have.lengthOf(0);
  });
});

function hasNoLocationData(e) {
  return (
    e.location.cityLocality === "" &&
    e.location.stateProvince === "" &&
    e.location.postalCode === "" &&
    e.location.countryCode == ""
  );
}

function hasNoCoordinates(e) {
  return (
    e.location.coordinates.latitude === 0 &&
    e.location.coordinates.longitude === 0
  );
}

const validateDateTimeFormat = (dateValue) => {
  expect(dateValue)
    .to.be.an("object")
    .with.keys("value", "hasTime", "hasTimeZone");
};

const data = {
  events: [
    {
      dateTime: {
        value: "2021-06-02T11:00:00.000Z",
        hasTime: true,
        hasTimeZone: true,
      },
      carrierDateTime: {
        hasTime: false,
        hasTimeZone: false,
      },
      status: "accepted",
      description: "Picked up from shipper's warehouse",
      carrierStatusCode: "PU7W",
      carrierDetailCode: "DRR-913c-0001",
      signer: "",
      location: {
        cityLocality: "",
        stateProvince: "",
        postalCode: "",
        countryCode: "",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
    },
    {
      dateTime: {
        value: "2021-06-03T14:00:00.000Z",
        hasTime: true,
        hasTimeZone: true,
      },
      carrierDateTime: {
        hasTime: false,
        hasTimeZone: false,
      },
      status: "in_transit",
      description: "En-route to distribution center hub",
      carrierStatusCode: "ER00P",
      carrierDetailCode: "",
      signer: "",
      location: {
        cityLocality: "",
        stateProvince: "",
        postalCode: "",
        countryCode: "",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
    },
    {
      dateTime: {
        value: "2021-06-08T11:00:00.000Z",
        hasTime: true,
        hasTimeZone: true,
      },
      carrierDateTime: {
        hasTime: false,
        hasTimeZone: false,
      },
      status: "exception",
      description: "Package lost",
      carrierStatusCode: "LL",
      carrierDetailCode: "",
      signer: "",
      location: {
        cityLocality: "",
        stateProvince: "",
        postalCode: "",
        countryCode: "",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
    },
  ],
};
