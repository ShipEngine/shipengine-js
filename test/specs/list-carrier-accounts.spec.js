const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
// const errors = require("../utils/errors");
const fetchMock = require("../utils/fetch-mock");

describe("listCarrierAccounts()", () => {
  it("Returns a list of connected carrier accounts", async () => {
    fetchMock.get("https://api.shipengine.com/v1/carriers", {
      carriers: [
        {
          carrier_id: "se-656171",
          carrier_code: "stamps_com",
          account_number: "test_account_656171",
          requires_funded_amount: true,
          balance: 27092.54,
          nickname: "ShipEngine Test Account - Stamps.com",
          friendly_name: "Stamps.com",
          primary: false,
          has_multi_package_supporting_services: false,
          supports_label_messages: true,
          services: [
            {
              carrier_id: "se-656171",
              carrier_code: "stamps_com",
              service_code: "usps_first_class_mail",
              name: "USPS First Class Mail",
              domestic: true,
              international: false,
              is_multi_package_supported: false,
            },
            {
              carrier_id: "se-656171",
              carrier_code: "stamps_com",
              service_code: "usps_media_mail",
              name: "USPS Media Mail",
              domestic: true,
              international: false,
              is_multi_package_supported: false,
            },
          ],
          packages: [
            {
              package_id: null,
              package_code: "cubic",
              name: "Cubic",
              description: "Cubic",
            },
            {
              package_id: null,
              package_code: "flat_rate_envelope",
              name: "Flat Rate Envelope",
              description:
                'USPS flat rate envelope. A special cardboard envelope provided by the USPS that clearly indicates "Flat Rate".',
            },
          ],
          options: [
            {
              name: "non_machinable",
              default_value: "false",
              description: "",
            },
            {
              name: "bill_to_account",
              default_value: null,
              description: "Bill To Account",
            },
            {
              name: "bill_to_party",
              default_value: null,
              description: "Bill To Party",
            },
            {
              name: "bill_to_postal_code",
              default_value: null,
              description: "Bill To Postal Code",
            },
            {
              name: "bill_to_country_code",
              default_value: null,
              description: "Bill To Country Code",
            },
          ],
        },
      ],
      request_id: "23826568-a243-4321-8627-19bb7d4bea9e",
      errors: [],
    });

    const shipengine = new ShipEngine({ apiKey });

    const result = await shipengine.listCarrierAccounts();

    expect(result).to.deep.equal({
      carriers: [
        {
          carrier_id: "se-656171",
          carrier_code: "stamps_com",
          account_number: "test_account_656171",
          requires_funded_amount: true,
          balance: 27092.54,
          nickname: "ShipEngine Test Account - Stamps.com",
          friendly_name: "Stamps.com",
          primary: false,
          has_multi_package_supporting_services: false,
          supports_label_messages: true,
          services: [
            {
              carrier_id: "se-656171",
              carrier_code: "stamps_com",
              service_code: "usps_first_class_mail",
              name: "USPS First Class Mail",
              domestic: true,
              international: false,
              is_multi_package_supported: false,
            },
            {
              carrier_id: "se-656171",
              carrier_code: "stamps_com",
              service_code: "usps_media_mail",
              name: "USPS Media Mail",
              domestic: true,
              international: false,
              is_multi_package_supported: false,
            },
          ],
          packages: [
            {
              package_id: null,
              package_code: "cubic",
              name: "Cubic",
              description: "Cubic",
            },
            {
              package_id: null,
              package_code: "flat_rate_envelope",
              name: "Flat Rate Envelope",
              description:
                'USPS flat rate envelope. A special cardboard envelope provided by the USPS that clearly indicates "Flat Rate".',
            },
          ],
          options: [
            {
              name: "non_machinable",
              default_value: "false",
              description: "",
            },
            {
              name: "bill_to_account",
              default_value: null,
              description: "Bill To Account",
            },
            {
              name: "bill_to_party",
              default_value: null,
              description: "Bill To Party",
            },
            {
              name: "bill_to_postal_code",
              default_value: null,
              description: "Bill To Postal Code",
            },
            {
              name: "bill_to_country_code",
              default_value: null,
              description: "Bill To Country Code",
            },
          ],
        },
      ],
      request_id: "23826568-a243-4321-8627-19bb7d4bea9e",
      errors: [],
    });

    fetchMock.restore();
  });
});
