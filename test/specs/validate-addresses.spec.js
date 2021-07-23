const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
const errors = require("../utils/errors");
const fetchMock = require("../utils/fetch-mock");

describe("validateAddresses()", () => {
  it("Validates a residential address", async () => {
    fetchMock.post("https://api.shipengine.com/v1/addresses/validate", [
      {
        status: "verified",
        original_address: {
          name: "John Smith",
          phone: null,
          company_name: null,
          address_line1: "3910 Bailey Lane",
          address_line2: null,
          address_line3: null,
          city_locality: "Austin",
          state_province: "TX",
          postal_code: "78756",
          country_code: "US",
          address_residential_indicator: "yes",
        },
        matched_address: {
          name: "JOHN SMITH",
          phone: null,
          company_name: null,
          address_line1: "3910 BAILEY LN",
          address_line2: "",
          address_line3: null,
          city_locality: "AUSTIN",
          state_province: "TX",
          postal_code: "78756-3924",
          country_code: "US",
          address_residential_indicator: "yes",
        },
        messages: [],
      },
    ]);

    const shipengine = new ShipEngine({ apiKey });

    const addressToValidate = {
      name: "John Smith",
      addressLine1: "3910 Bailey Lane",
      cityLocality: "Austin",
      stateProvince: "TX",
      postalCode: "78756",
      countryCode: "US",
      addressResidentialIndicator: "yes",
    };

    const result = await shipengine.validateAddresses([addressToValidate]);

    expect(result).to.deep.equal([
      {
        status: "verified",
        originalAddress: {
          name: "John Smith",
          companyName: "",
          addressLine1: "3910 Bailey Lane",
          addressLine2: "",
          addressLine3: "",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "yes",
        },
        normalizedAddress: {
          name: "JOHN SMITH",
          companyName: "",
          addressLine1: "3910 BAILEY LN",
          addressLine2: "",
          addressLine3: "",
          cityLocality: "AUSTIN",
          stateProvince: "TX",
          postalCode: "78756-3924",
          countryCode: "US",
          addressResidentialIndicator: "yes",
        },
        messages: [],
      },
    ]);

    // There are no warning or error messages
    expect(result[0].messages).to.be.an("array").and.be.empty;

    fetchMock.restore();
  });

  it("Validates a commercial address", async () => {
    fetchMock.post("https://api.shipengine.com/v1/addresses/validate", [
      {
        status: "verified",
        original_address: {
          name: "John Smith",
          phone: null,
          company_name: "ShipStation",
          address_line1: "3800 N Lamar Blvd",
          address_line2: "#220",
          address_line3: null,
          city_locality: "Austin",
          state_province: "TX",
          postal_code: "78756",
          country_code: "US",
          address_residential_indicator: "no",
        },
        matched_address: {
          name: "JOHN SMITH",
          phone: null,
          company_name: "SHIPSTATION",
          address_line1: "3800 N LAMAR BLVD STE 220",
          address_line2: "",
          address_line3: null,
          city_locality: "AUSTIN",
          state_province: "TX",
          postal_code: "78756-0003",
          country_code: "US",
          address_residential_indicator: "no",
        },
        messages: [],
      },
    ]);

    const shipengine = new ShipEngine({ apiKey });

    const addressToValidate = [
      {
        name: "John Smith",
        companyName: "ShipStation",
        addressLine1: "3800 N Lamar Blvd",
        addressLine2: "#220",
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        countryCode: "US",
        addressResidentialIndicator: "no",
      },
    ];

    const result = await shipengine.validateAddresses(addressToValidate);

    expect(result).to.deep.equal([
      {
        status: "verified",
        originalAddress: {
          name: "John Smith",
          companyName: "ShipStation",
          addressLine1: "3800 N Lamar Blvd",
          addressLine2: "#220",
          addressLine3: "",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        normalizedAddress: {
          name: "JOHN SMITH",
          companyName: "SHIPSTATION",
          addressLine1: "3800 N LAMAR BLVD STE 220",
          addressLine2: "",
          addressLine3: "",
          cityLocality: "AUSTIN",
          stateProvince: "TX",
          postalCode: "78756-0003",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        messages: [],
      },
    ]);

    // There are no warning or error messages
    expect(result[0].messages).to.be.an("array").and.be.empty;

    fetchMock.restore();
  });

  it("Validates an address with messages", async () => {
    fetchMock.post("https://api.shipengine.com/v1/addresses/validate", [
      {
        status: "error",
        original_address: {
          name: "John Smith",
          phone: null,
          company_name: null,
          address_line1: "Winchester Blvd",
          address_line2: null,
          address_line3: null,
          city_locality: "San Jose",
          state_province: "CA",
          postal_code: "78756",
          country_code: "US",
          address_residential_indicator: "unknown",
        },
        matched_address: {
          name: "JOHN SMITH",
          phone: null,
          company_name: null,
          address_line1: "WINCHESTER BLVD",
          address_line2: "",
          address_line3: null,
          city_locality: "SAN JOSE",
          state_province: "CA",
          postal_code: "95128-2092",
          country_code: "US",
          address_residential_indicator: "unknown",
        },
        messages: [
          {
            code: "a1004",
            message: "Address not found",
            type: "warning",
            detail_code: null,
          },
          {
            code: "a1004",
            message: "Insufficient or Incorrect Address Data",
            type: "warning",
            detail_code: null,
          },
        ],
      },
    ]);

    const shipengine = new ShipEngine({ apiKey });

    const addressToValidate = [
      {
        name: "John Smith",
        addressLine1: "Winchester Blvd",
        cityLocality: "San Jose",
        stateProvince: "CA",
        postalCode: "78756",
        countryCode: "US",
      },
    ];

    const result = await shipengine.validateAddresses(addressToValidate);

    expect(result).to.deep.equal([
      {
        status: "error",
        originalAddress: {
          name: "John Smith",
          companyName: "",
          addressLine1: "Winchester Blvd",
          addressLine2: "",
          addressLine3: "",
          cityLocality: "San Jose",
          stateProvince: "CA",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "unknown",
        },
        normalizedAddress: {
          name: "JOHN SMITH",
          companyName: "",
          addressLine1: "WINCHESTER BLVD",
          addressLine2: "",
          addressLine3: "",
          cityLocality: "SAN JOSE",
          stateProvince: "CA",
          postalCode: "95128-2092",
          countryCode: "US",
          addressResidentialIndicator: "unknown",
        },
        messages: [
          { detailCode: "", message: "Address not found", type: "warning" },
          {
            detailCode: "",
            message: "Insufficient or Incorrect Address Data",
            type: "warning",
          },
        ],
      },
    ]);

    // There are no warning or error messages
    expect(result[0].messages).to.be.an("array").and.not.be.empty;

    fetchMock.restore();
  });

  it("Throws an error if the params provided are not an array", async () => {
    const shipengine = new ShipEngine({ apiKey });

    const addressToValidate = {
      name: "John Smith",
      companyName: "ShipStation",
      addressLine2: "#220",
      cityLocality: "AUSTIN",
      stateProvince: "TX",
      postalCode: "78756-0003",
      countryCode: "US",
    };

    try {
      await shipengine.validateAddresses(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertInvalidFieldValueError(error, {
        code: "invalid_field_value",
        fieldName: "Params",
        message: "Params must be an array.",
        name: "InvalidFieldValueError",
        source: "shipengine",
        type: "validation",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it.skip("Throws an error when given an empty array", async () => {
    fetchMock.postOnce("https://api.shipengine.com/v1/addresses/validate", {
      status: 400,
      body: {
        request_id: "5d6eb8ef-e354-4279-a9b8-f3e33ab89e0b",
        errors: [
          {
            error_source: "shipengine",
            error_type: "validation",
            error_code: "request_body_required",
            message: "Request body cannot be empty.",
          },
        ],
      },
    });

    const shipengine = new ShipEngine({ apiKey });

    try {
      await shipengine.validateAddresses([]);
      errors.shouldHaveThrown();
    } catch (error) {
      console.log(error);
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "validation",
        code: "request_body_required",
        message: "The ShipEngine /v1/addresses/validate API timed out.",
      });
    }

    fetchMock.restore();
  });

  it("Throws an error when the request times out", async () => {
    fetchMock.postOnce("https://api.shipengine.com/v1/addresses/validate", {
      status: 429,
      body: {
        request_id: "7b80b28f-80d2-4175-ad99-7c459980539f",
        errors: [
          {
            error_source: "shipengine",
            error_type: "system",
            error_code: "rate_limit_exceeded",
            message:
              "You have exceeded the rate limit. Please see https://www.shipengine.com/docs/rate-limits",
          },
        ],
      },
    });
    const shipengine = new ShipEngine({ apiKey, timeout: 500, retries: 0 });

    const addressToValidate = {
      name: "John Smith",
      addressLine1: "3910 Bailey Lane",
      cityLocality: "Austin",
      stateProvince: "TX",
      postalCode: "78756",
      countryCode: "US",
      isResidential: true,
    };

    try {
      await shipengine.validateAddresses(addressToValidate);
      errors.shouldHaveThrown();
    } catch (error) {
      errors.assertShipEngineError(error, {
        name: "ShipEngineError",
        source: "shipengine",
        type: "system",
        code: "timeout",
        message: "The ShipEngine /v1/addresses/validate API timed out.",
      });
      expect(error.requestId).to.be.undefined;
    }
  });

  it("Retries when it encounters a 429 error", async () => {
    fetchMock.postOnce("https://api.shipengine.com/v1/addresses/validate", {
      status: 429,
      body: {
        request_id: "7b80b28f-80d2-4175-ad99-7c459980539f",
        errors: [
          {
            error_source: "shipengine",
            error_type: "system",
            error_code: "rate_limit_exceeded",
            message:
              "You have exceeded the rate limit. Please see https://www.shipengine.com/docs/rate-limits",
          },
        ],
      },
    });

    fetchMock.postOnce(
      "https://api.shipengine.com/v1/addresses/validate",
      [
        {
          status: "verified",
          original_address: {
            name: "John Smith",
            phone: null,
            company_name: "ShipStation",
            address_line1: "3800 N Lamar Blvd",
            address_line2: "#220",
            address_line3: null,
            city_locality: "Austin",
            state_province: "TX",
            postal_code: "78756",
            country_code: "US",
            address_residential_indicator: "no",
          },
          matched_address: {
            name: "JOHN SMITH",
            phone: null,
            company_name: "SHIPSTATION",
            address_line1: "3800 N LAMAR BLVD STE 220",
            address_line2: "",
            address_line3: null,
            city_locality: "AUSTIN",
            state_province: "TX",
            postal_code: "78756-0003",
            country_code: "US",
            address_residential_indicator: "no",
          },
          messages: [],
        },
      ],
      { overwriteRoutes: false }
    );

    const shipengine = new ShipEngine({ apiKey, retries: 1 });

    const addressToValidate = [
      {
        name: "John Smith",
        companyName: "ShipStation",
        addressLine1: "3800 N Lamar Blvd",
        addressLine2: "#220",
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        countryCode: "US",
        addressResidentialIndicator: "no",
      },
    ];

    const result = await shipengine.validateAddresses(addressToValidate);

    expect(result).to.deep.equal([
      {
        status: "verified",
        originalAddress: {
          name: "John Smith",
          companyName: "ShipStation",
          addressLine1: "3800 N Lamar Blvd",
          addressLine2: "#220",
          addressLine3: "",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        normalizedAddress: {
          name: "JOHN SMITH",
          companyName: "SHIPSTATION",
          addressLine1: "3800 N LAMAR BLVD STE 220",
          addressLine2: "",
          addressLine3: "",
          cityLocality: "AUSTIN",
          stateProvince: "TX",
          postalCode: "78756-0003",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        messages: [],
      },
    ]);
  });
});
