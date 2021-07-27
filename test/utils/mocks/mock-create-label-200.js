const fetchMock = require("../fetch-mock");

function mockCreateLabel200() {
  fetchMock.post("https://api.shipengine.com/v1/labels", {
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
}

module.exports = { mockCreateLabel200 };
