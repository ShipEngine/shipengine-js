const { expect } = require("chai");
const { ShipEngine } = require("../../esm");
const { apiKey } = require("../utils/constants");
const {
  mockCreateLabelFromRate200,
} = require("../utils/mocks/mock-create-label-from-rate-200");

describe("createLabelFromRate()", () => {
  it("Returns a label that was created", async () => {
    mockCreateLabelFromRate200();

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.createLabelFromRate({
      validateAddress: "no_validation",
      labelLayout: "4x6",
      labelFormat: "pdf",
      labelDownloadType: "url",
      displayScheme: "label",
      rateId: "testing",
    });

    expect(result).to.deep.equal({
      labelId: "se-28529731",
      status: "processing",
      shipmentId: "se-28529731",
      shipDate: "2018-09-23T00:00:00.000Z",
      createdAt: "2018-09-23T15:00:00.000Z",
      shipmentCost: {
        currency: "usd",
        amount: 0,
      },
      insuranceCost: {
        currency: "usd",
        amount: 0,
      },
      trackingNumber: "782758401696",
      isReturnLabel: true,
      rmaNumber: "string",
      isInternational: true,
      batchId: "se-28529731",
      carrierId: "se-28529731",
      chargeEvent: "carrier_default",
      serviceCode: "usps_first_class_mail",
      packageCode: "small_flat_rate_box",
      voided: true,
      voidedAt: "2018-09-23T15:00:00.000Z",
      labelFormat: "pdf",
      displayScheme: "label",
      labelLayout: "4x6",
      trackable: true,
      labelImageId: "img_DtBXupDBxREpHnwEXhTfgK",
      carrierCode: "dhl_express",
      trackingStatus: "unknown",
      labelDownload: {
        href: "http://api.shipengine.com/v1/labels/se-28529731",
        pdf: "http://api.shipengine.com/v1/labels/se-28529731",
        png: "http://api.shipengine.com/v1/labels/se-28529731",
        zpl: "http://api.shipengine.com/v1/labels/se-28529731",
      },
      formDownload: {
        href: "http://api.shipengine.com/v1/labels/se-28529731",
        type: "string",
      },
      insuranceClaim: {
        href: "http://api.shipengine.com/v1/labels/se-28529731",
        type: "string",
      },
      packages: [
        {
          packageCode: "small_flat_rate_box",
          weight: {
            value: 0,
            unit: "pound",
          },
          dimensions: {
            unit: "inch",
            length: 0,
            width: 0,
            height: 0,
          },
          insuredValue: {
            currency: "usd",
            amount: 0,
          },
          trackingNumber: "1Z932R800392060079",
          labelMessages: {
            reference1: null,
            reference2: null,
            reference3: null,
          },
          externalPackageId: "string",
        },
      ],
    });
  });
});
