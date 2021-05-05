const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey, baseURL } = require("../utils/constants");
const errors = require("../utils/errors");

describe("trackPackageByTrackingNumber", () => {
  it("Tracks a package using a tracking number and carrier code", async function () {
    const shipengine = new ShipEngine({ apiKey, baseURL });
    const params = {
      trackingNumber: "AAAA",
      carrierCode: "fedex",
    };
    const response = await shipengine.trackPackage(params);
    console.log(response);
  });
});
