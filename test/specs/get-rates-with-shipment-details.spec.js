const { expect } = require("chai");
const { ShipEngine } = require("../../");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");
const fetchMock = require("../utils/fetch-mock");
const { mockGetRates200 } = require("../utils/mocks/mock-get-rates");

describe("getRatesWithShipmentDetails()", () => {
  it("Returns rates on a successful request", async () => {
    mockGetRates200();

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.getRatesWithShipmentDetails({
      rate_options: {
        carrier_ids: ["se-161650"],
        service_codes: ["usps_first_class_mail"],
        package_types: ["package"],
      },
      shipment: {
        service_code: "",
        ship_to: {
          name: "James Atkinson",
          phone: null,
          address_line1: "28793 Fox Fire Lane",
          city_locality: "Shell Knob",
          state_province: "MO",
          postal_code: "65747",
          country_code: "US",
          address_residential_indicator: "yes",
        },
        ship_from: {
          name: "Medals of America",
          phone: "800-308-0849",
          company_name: null,
          address_line1: "114 Southchase Blvd",
          address_line2: "",
          city_locality: "Fountain Inn",
          state_province: "SC",
          postal_code: "29644",
          country_code: "US",
          address_residential_indicator: "no",
        },
        packages: [
          {
            weight: {
              value: 2.9,
              unit: "ounce",
            },
            label_messages: {
              reference1: "4051492",
            },
          },
        ],
      },
    });

    expect(result).to.deep.equal({
      shipmentId: "se-141694059",
      carrierId: "se-161650",
      serviceCode: "usps_first_class_mail",
      externalOrderId: null,
      items: [],
      taxIdentifiers: null,
      externalShipmentId: null,
      shipDate: "2021-07-28T00:00:00Z",
      createdAt: "2021-07-28T16:56:40.257Z",
      modifiedAt: "2021-07-28T16:56:40.223Z",
      shipmentStatus: "pending",
      shipTo: {
        name: "James Atkinson",
        phone: null,
        companyName: null,
        addressLine1: "28793 Fox Fire Lane",
        addressLine2: null,
        addressLine3: null,
        cityLocality: "Shell Knob",
        stateProvince: "MO",
        postalCode: "65747",
        countryCode: "US",
        addressResidentialIndicator: "yes",
      },
      shipFrom: {
        name: "Medals of America",
        phone: "800-308-0849",
        companyName: null,
        addressLine1: "114 Southchase Blvd",
        addressLine2: null,
        addressLine3: null,
        cityLocality: "Fountain Inn",
        stateProvince: "SC",
        postalCode: "29644",
        countryCode: "US",
        addressResidentialIndicator: "unknown",
      },
      warehouseId: null,
      returnTo: {
        name: "Medals of America",
        phone: "800-308-0849",
        companyName: null,
        addressLine1: "114 Southchase Blvd",
        addressLine2: null,
        addressLine3: null,
        cityLocality: "Fountain Inn",
        stateProvince: "SC",
        postalCode: "29644",
        countryCode: "US",
        addressResidentialIndicator: "unknown",
      },
      confirmation: "none",
      customs: {
        contents: "merchandise",
        nonDelivery: "return_to_sender",
        customsItems: [],
      },
      advancedOptions: {
        billToAccount: null,
        billToCountryCode: null,
        billToParty: null,
        billToPostalCode: null,
        containsAlcohol: null,
        deliveryDutyPaid: null,
        dryIce: null,
        dryIceWeight: null,
        nonMachinable: null,
        saturdayDelivery: null,
        useUPSGroundFreightPricing: null,
        freightClass: null,
        customField1: null,
        customField2: null,
        customField3: null,
        originType: null,
        shipperRelease: null,
        collectOnDelivery: null,
      },
      originType: null,
      insuranceProvider: "none",
      tags: [],
      orderSourceCode: null,
      packages: [
        {
          packageCode: "package",
          weight: { value: 2.9, unit: "ounce" },
          dimensions: { unit: "inch", length: 0, width: 0, height: 0 },
          insuredValue: { currency: "usd", amount: 0 },
          trackingNumber: null,
          labelMessages: {
            reference1: "4051492",
            reference2: null,
            reference3: null,
          },
          externalPackageId: null,
        },
      ],
      totalWeight: { value: 2.9, unit: "ounce" },
      rateResponse: {
        rates: [
          {
            rateId: "se-784001113",
            rateType: "shipment",
            carrierId: "se-161650",
            shippingAmount: { currency: "usd", amount: 3.12 },
            insuranceAmount: { currency: "usd", amount: 0 },
            confirmationAmount: { currency: "usd", amount: 0 },
            otherAmount: { currency: "usd", amount: 0 },
            taxAmount: null,
            zone: 5,
            packageType: "package",
            deliveryDays: 3,
            guaranteedService: false,
            estimatedDeliveryDate: "2021-07-31T00:00:00Z",
            carrierDeliveryDays: "3",
            shipDate: "2021-07-28T00:00:00Z",
            negotiatedRate: false,
            serviceType: "USPS First Class Mail",
            serviceCode: "usps_first_class_mail",
            trackable: true,
            carrierCode: "usps",
            carrierNickname: "USPS",
            carrierFriendlyName: "USPS",
            validationStatus: "valid",
            warningMessages: [],
            errorMessages: [],
          },
        ],
        invalidRates: [],
        rateRequestId: "se-85117731",
        shipmentId: "se-141694059",
        createdAt: "2021-07-28T16:56:40.6148892Z",
        status: "completed",
        errors: [],
      },
    });

    fetchMock.restore();
  });

  it("Throws an error if the request returns a 500", async () => {
    fetchMock.post("https://api.shipengine.com/v1/rates", {
      status: 500,
      body: {
        request_id: "123456789132456789123465789",
        error: {
          message: "Something bad happened",
        },
      },
    });

    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.getRatesWithShipmentDetails({
        rate_options: {
          carrier_ids: ["se-161650"],
          service_codes: ["usps_first_class_mail"],
          package_types: ["package"],
        },
        shipment: {
          service_code: "",
          ship_to: {
            name: "James Atkinson",
            phone: null,
            address_line1: "28793 Fox Fire Lane",
            city_locality: "Shell Knob",
            state_province: "MO",
            postal_code: "65747",
            country_code: "US",
            address_residential_indicator: "yes",
          },
          ship_from: {
            name: "Medals of America",
            phone: "800-308-0849",
            company_name: null,
            address_line1: "114 Southchase Blvd",
            address_line2: "",
            city_locality: "Fountain Inn",
            state_province: "SC",
            postal_code: "29644",
            country_code: "US",
            address_residential_indicator: "no",
          },
          packages: [
            {
              weight: {
                value: 2.9,
                unit: "ounce",
              },
              label_messages: {
                reference1: "4051492",
              },
            },
          ],
        },
      });
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "unspecified",
        message: "An unknown error occurred while calling the ShipEngine API.",
      });

      expect(error.requestId).to.be.undefined;
    }

    fetchMock.restore();
  });
});
