const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const { mockCreateLabel200 } = require("../utils/mocks/mock-create-label-200");

describe("createLabelFromShipmentDetails)", () => {
  it("Returns a label that was created", async () => {
    mockCreateLabel200();

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.createLabelFromShipmentDetails({
      shipment: {
        carrier_id: "se-28529731",
        service_code: "usps_first_class_mail",
        external_order_id: "string",
        items: [],
        tax_identifiers: [
          {
            taxable_entity_type: "shipper",
            identifier_type: "vat",
            issuing_authority: "string",
            value: "string",
          },
        ],
        external_shipment_id: "string",
        ship_date: "2018-09-23T00:00:00.000Z",
        ship_to: {
          name: "John Doe",
          phone: "+1 204-253-9411 ext. 123",
          company_name: "The Home Depot",
          address_line1: "1999 Bishop Grandin Blvd.",
          address_line2: "Unit 408",
          address_line3: "Building #7",
          city_locality: "Winnipeg",
          state_province: "Manitoba",
          postal_code: "78756-3717",
          country_code: "CA",
          address_residential_indicator: "no",
        },
        ship_from: {
          name: "John Doe",
          phone: "+1 204-253-9411 ext. 123",
          company_name: "The Home Depot",
          address_line1: "1999 Bishop Grandin Blvd.",
          address_line2: "Unit 408",
          address_line3: "Building #7",
          city_locality: "Winnipeg",
          state_province: "Manitoba",
          postal_code: "78756-3717",
          country_code: "CA",
          address_residential_indicator: "no",
        },
        warehouse_id: "se-28529731",
        return_to: {
          name: "John Doe",
          phone: "+1 204-253-9411 ext. 123",
          company_name: "The Home Depot",
          address_line1: "1999 Bishop Grandin Blvd.",
          address_line2: "Unit 408",
          address_line3: "Building #7",
          city_locality: "Winnipeg",
          state_province: "Manitoba",
          postal_code: "78756-3717",
          country_code: "CA",
          address_residential_indicator: "no",
        },
        confirmation: "none",
        customs: {
          contents: "merchandise",
          non_delivery: "return_to_sender",
          customs_items: [],
        },
        advanced_options: {
          bill_to_account: null,
          bill_to_country_code: "CA",
          bill_to_party: "recipient",
          bill_to_postal_code: null,
          contains_alcohol: false,
          delivered_duty_paid: false,
          dry_ice: false,
          dry_ice_weight: {
            value: 0,
            unit: "pound",
          },
          non_machinable: false,
          saturday_delivery: false,
          use_ups_ground_freight_pricing: null,
          freight_class: 77.5,
          custom_field1: null,
          custom_field2: null,
          custom_field3: null,
          origin_type: "pickup",
          shipper_release: null,
          collect_on_delivery: {
            payment_type: "any",
            payment_amount: {
              currency: "usd",
              amount: 0,
            },
          },
        },
        origin_type: "pickup",
        insurance_provider: "none",
        order_source_code: "amazon_ca",
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
              0: {
                currency: "usd",
                amount: 0,
              },
              currency: "usd",
              amount: 0,
            },
            label_messages: {
              reference1: null,
              reference2: null,
              reference3: null,
            },
            external_package_id: "string",
          },
        ],
      },
      is_return_label: true,
      rma_number: "string",
      charge_event: "carrier_default",
      outbound_label_id: "se-28529731",
      test_label: false,
      validate_address: "no_validation",
      label_download_type: "url",
      label_format: "pdf",
      display_scheme: "label",
      label_layout: "4x6",
      label_image_id: "img_DtBXupDBxREpHnwEXhTfgK",
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
