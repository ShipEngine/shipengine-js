const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");
const fetchMock = require("../utils/fetch-mock");

describe("createLabelFromRate()", () => {
  it("Returns a label that was created", async () => {
    fetchMock.post("https://api.shipengine.com/v1/labels/rates/testing", {
      label_id: "se-28529731",
      status: "processing",
      shipment_id: "se-28529731",
      ship_date: "2018-09-23T00:00:00.000Z",
      created_at: "2018-09-23T15:00:00.000Z",
      shipment_cost: {
        currency: "usd",
        amount: 0,
      },
      insurance_cost: {
        currency: "usd",
        amount: 0,
      },
      tracking_number: "782758401696",
      is_return_label: true,
      rma_number: "string",
      is_international: true,
      batch_id: "se-28529731",
      carrier_id: "se-28529731",
      charge_event: "carrier_default",
      service_code: "usps_first_class_mail",
      package_code: "small_flat_rate_box",
      voided: true,
      voided_at: "2018-09-23T15:00:00.000Z",
      label_format: "pdf",
      display_scheme: "label",
      label_layout: "4x6",
      trackable: true,
      label_image_id: "img_DtBXupDBxREpHnwEXhTfgK",
      carrier_code: "dhl_express",
      tracking_status: "unknown",
      label_download: {
        href: "http://api.shipengine.com/v1/labels/se-28529731",
        pdf: "http://api.shipengine.com/v1/labels/se-28529731",
        png: "http://api.shipengine.com/v1/labels/se-28529731",
        zpl: "http://api.shipengine.com/v1/labels/se-28529731",
      },
      form_download: {
        href: "http://api.shipengine.com/v1/labels/se-28529731",
        type: "string",
      },
      insurance_claim: {
        href: "http://api.shipengine.com/v1/labels/se-28529731",
        type: "string",
      },
      packages: [
        {
          package_code: "small_flat_rate_box",
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
          insured_value: {
            currency: "usd",
            amount: 0,
          },
          tracking_number: "1Z932R800392060079",
          label_messages: {
            reference1: null,
            reference2: null,
            reference3: null,
          },
          external_package_id: "string",
        },
      ],
    });

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

  it("Throws an error if the params provided do not have a rate id", async () => {
    const shipengine = new ShipEngine({ apiKey });

    const paramsToValidate = {
      rateId: 1,
    };

    try {
      await shipengine.createLabelFromRate(paramsToValidate);
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
});
