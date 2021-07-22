const { expect } = require("chai");
const { ShipEngine } = require("../..");
const { apiKey } = require("../utils/constants");
// const errors = require("../utils/errors");
const nock = require("nock");

describe("validateAddresses()", () => {
  it("Validates a residential address", async () => {
    nock("https://api.shipengine.com")
      .post("/v1/addresses/validate")
      .reply(200, [
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
  });

  // it("Validates a commercial address", async () => {
  //   nock("https://api.shipengine.com")
  //     .post("/v1/addresses/validate")
  //     .reply(200, [
  //       {
  //         status: "verified",
  //         original_address: {
  //           name: "John Smith",
  //           phone: null,
  //           company_name: "ShipStation",
  //           address_line1: "3800 N Lamar Blvd",
  //           address_line2: "#220",
  //           address_line3: null,
  //           city_locality: "Austin",
  //           state_province: "TX",
  //           postal_code: "78756",
  //           country_code: "US",
  //           address_residential_indicator: "no",
  //         },
  //         matched_address: {
  //           name: "JOHN SMITH",
  //           phone: null,
  //           company_name: "SHIPSTATION",
  //           address_line1: "3800 N LAMAR BLVD STE 220",
  //           address_line2: "",
  //           address_line3: null,
  //           city_locality: "AUSTIN",
  //           state_province: "TX",
  //           postal_code: "78756-0003",
  //           country_code: "US",
  //           address_residential_indicator: "no",
  //         },
  //         messages: [],
  //       },
  //     ]);

  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     cityLocality: "Austin",
  //     stateProvince: "TX",
  //     postalCode: "78756",
  //     countryCode: "US",
  //     isResidential: false,
  //   };

  //   const result = await shipengine.validateAddresses(addressToValidate);

  //   expect(result).to.deep.equal({
  //     status: "verified",
  //     originalAddress: {
  //       name: "John Smith",
  //       companyName: "ShipStation",
  //       addressLine1: "3800 N Lamar Blvd",
  //       addressLine2: "#220",
  //       addressLine3: "",
  //       cityLocality: "Austin",
  //       stateProvince: "TX",
  //       postalCode: "78756",
  //       countryCode: "US",
  //       isResidential: false,
  //     },
  //     normalizedAddress: {
  //       name: "JOHN SMITH",
  //       companyName: "SHIPSTATION",
  //       addressLine1: "3800 N LAMAR BLVD STE 220",
  //       addressLine2: "",
  //       addressLine3: "",
  //       cityLocality: "AUSTIN",
  //       stateProvince: "TX",
  //       postalCode: "78756-0003",
  //       countryCode: "US",
  //       isResidential: false,
  //     },
  //     messages: [],
  //   });

  //   const { normalizedAddress } = result;

  //   // The isResidential flag on the normalized address is true
  //   expect(normalizedAddress.isResidential)
  //     .to.be.a("boolean")
  //     .and.to.equal(false);

  //   // There are no warning or error messages
  //   expect(result.messages).to.be.an("array").and.be.empty;
  // });

  // it("Validates an address with messages", async () => {
  //   nock("https://api.shipengine.com")
  //     .post("/v1/addresses/validate")
  //     .reply(200, [
  //       {
  //         status: "error",
  //         original_address: {
  //           name: "John Smith",
  //           phone: null,
  //           company_name: null,
  //           address_line1: "Winchester Blvd",
  //           address_line2: null,
  //           address_line3: null,
  //           city_locality: "San Jose",
  //           state_province: "CA",
  //           postal_code: "78756",
  //           country_code: "US",
  //           address_residential_indicator: "unknown",
  //         },
  //         matched_address: {
  //           name: "JOHN SMITH",
  //           phone: null,
  //           company_name: null,
  //           address_line1: "WINCHESTER BLVD",
  //           address_line2: "",
  //           address_line3: null,
  //           city_locality: "SAN JOSE",
  //           state_province: "CA",
  //           postal_code: "95128-2092",
  //           country_code: "US",
  //           address_residential_indicator: "unknown",
  //         },
  //         messages: [
  //           {
  //             code: "a1004",
  //             message: "Address not found",
  //             type: "warning",
  //             detail_code: null,
  //           },
  //           {
  //             code: "a1004",
  //             message: "Insufficient or Incorrect Address Data",
  //             type: "warning",
  //             detail_code: null,
  //           },
  //         ],
  //       },
  //     ]);

  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     addressLine1: "Winchester Blvd",
  //     cityLocality: "San Jose",
  //     stateProvince: "CA",
  //     postalCode: "78756",
  //     countryCode: "US",
  //   };

  //   const result = await shipengine.validateAddresses(addressToValidate);

  //   expect(result).to.deep.equal({
  //     status: "error",
  //     originalAddress: {
  //       name: "John Smith",
  //       companyName: "",
  //       addressLine1: "Winchester Blvd",
  //       addressLine2: "",
  //       addressLine3: "",
  //       cityLocality: "San Jose",
  //       stateProvince: "CA",
  //       postalCode: "78756",
  //       countryCode: "US",
  //       isResidential: false,
  //     },
  //     normalizedAddress: {
  //       name: "JOHN SMITH",
  //       companyName: "",
  //       addressLine1: "WINCHESTER BLVD",
  //       addressLine2: "",
  //       addressLine3: "",
  //       cityLocality: "SAN JOSE",
  //       stateProvince: "CA",
  //       postalCode: "95128-2092",
  //       countryCode: "US",
  //       isResidential: false,
  //     },
  //     messages: [
  //       { detailCode: "", message: "Address not found", type: "warning" },
  //       {
  //         detailCode: "",
  //         message: "Insufficient or Incorrect Address Data",
  //         type: "warning",
  //       },
  //     ],
  //   });

  //   // There are no warning or error messages
  //   expect(result.messages).to.be.an("array").and.not.be.empty;
  // });

  // it("Throws an error if no address lines are provided", async () => {
  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine2: "#220",
  //     cityLocality: "AUSTIN",
  //     stateProvince: "TX",
  //     postalCode: "78756-0003",
  //     countryCode: "US",
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "field_value_required",
  //       message: "Invalid address. The addressLine1 must be specified.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *provided*", async () => {
  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     countryCode: "US",
  //     isResidential: false,
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "field_value_required",
  //       message:
  //         "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error if the postalCode, cityLocality, and stateProvince properties are not *populated*", async () => {
  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     postalCode: "",
  //     cityLocality: "",
  //     stateProvince: "",
  //     countryCode: "US",
  //     isResidential: false,
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "field_value_required",
  //       message:
  //         "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error if neither the postalCode nor the cityLocality is provided, (state only provided)", async () => {
  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     stateProvince: "TX",
  //     countryCode: "US",
  //     isResidential: false,
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "field_value_required",
  //       message:
  //         "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error if neither the postalCode nor the stateProvince is provided (citLocality only provided)", async () => {
  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     cityLocality: "Austin",
  //     countryCode: "US",
  //     isResidential: false,
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "field_value_required",
  //       message:
  //         "Invalid address. Either the postal code or the city/locality and state/province must be specified.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error if the country is not provided", async () => {
  //   const shipengine = new ShipEngine({ apiKey });
  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     cityLocality: "Austin",
  //     stateProvince: "TX",
  //     postalCode: "78756",
  //     isResidential: false,
  //   };
  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "field_value_required",
  //       message: "Invalid address. The country must be specified.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error if the country is invalid", async () => {
  //   const shipengine = new ShipEngine({ apiKey });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     cityLocality: "Austin",
  //     stateProvince: "TX",
  //     postalCode: "78756",
  //     countryCode: "USA",
  //     isResidential: false,
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "validation",
  //       code: "invalid_field_value",
  //       message: "Invalid address. USA is not a valid country code.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Throws an error when the request times out", async () => {
  //   nock("https://api.shipengine.com")
  //     .post("/v1/addresses/validate")
  //     .delayConnection(600)
  //     .reply(200, [
  //       {
  //         status: "verified",
  //         original_address: {
  //           name: "John Smith",
  //           phone: null,
  //           company_name: null,
  //           address_line1: "3910 Bailey Lane",
  //           address_line2: null,
  //           address_line3: null,
  //           city_locality: "Austin",
  //           state_province: "TX",
  //           postal_code: "78756",
  //           country_code: "US",
  //           address_residential_indicator: "yes",
  //         },
  //         matched_address: {
  //           name: "JOHN SMITH",
  //           phone: null,
  //           company_name: null,
  //           address_line1: "3910 BAILEY LN",
  //           address_line2: "",
  //           address_line3: null,
  //           city_locality: "AUSTIN",
  //           state_province: "TX",
  //           postal_code: "78756-3924",
  //           country_code: "US",
  //           address_residential_indicator: "yes",
  //         },
  //         messages: [],
  //       },
  //     ]);

  //   const shipengine = new ShipEngine({ apiKey, timeout: 500, retries: 0 });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     addressLine1: "3910 Bailey Lane",
  //     cityLocality: "Austin",
  //     stateProvince: "TX",
  //     postalCode: "78756",
  //     countryCode: "US",
  //     isResidential: true,
  //   };

  //   try {
  //     await shipengine.validateAddresses(addressToValidate);
  //     errors.shouldHaveThrown();
  //   } catch (error) {
  //     errors.assertShipEngineError(error, {
  //       name: "ShipEngineError",
  //       source: "shipengine",
  //       type: "system",
  //       code: "timeout",
  //       message: "The ShipEngine /v1/addresses/validate API timed out.",
  //     });
  //     expect(error.requestId).to.be.undefined;
  //   }
  // });

  // it("Retries when it encounters a 429 error", async () => {
  //   nock("https://api.shipengine.com")
  //     .post("/v1/addresses/validate")
  //     .reply(429, {
  //       request_id: "7b80b28f-80d2-4175-ad99-7c459980539f",
  //       errors: [
  //         {
  //           error_source: "shipengine",
  //           error_type: "system",
  //           error_code: "rate_limit_exceeded",
  //           message:
  //             "You have exceeded the rate limit. Please see https://www.shipengine.com/docs/rate-limits",
  //         },
  //       ],
  //     })
  //     .post("/v1/addresses/validate")
  //     .reply(200, [
  //       {
  //         status: "verified",
  //         original_address: {
  //           name: "John Smith",
  //           phone: null,
  //           company_name: "ShipStation",
  //           address_line1: "3800 N Lamar Blvd",
  //           address_line2: "#220",
  //           address_line3: null,
  //           city_locality: "Austin",
  //           state_province: "TX",
  //           postal_code: "78756",
  //           country_code: "US",
  //           address_residential_indicator: "no",
  //         },
  //         matched_address: {
  //           name: "JOHN SMITH",
  //           phone: null,
  //           company_name: "SHIPSTATION",
  //           address_line1: "3800 N LAMAR BLVD STE 220",
  //           address_line2: "",
  //           address_line3: null,
  //           city_locality: "AUSTIN",
  //           state_province: "TX",
  //           postal_code: "78756-0003",
  //           country_code: "US",
  //           address_residential_indicator: "no",
  //         },
  //         messages: [],
  //       },
  //     ]);

  //   const shipengine = new ShipEngine({ apiKey, retries: 1 });

  //   const addressToValidate = {
  //     name: "John Smith",
  //     companyName: "ShipStation",
  //     addressLine1: "3800 N Lamar Blvd",
  //     addressLine2: "#220",
  //     cityLocality: "Austin",
  //     stateProvince: "TX",
  //     postalCode: "78756",
  //     countryCode: "US",
  //     isResidential: false,
  //   };

  //   const result = await shipengine.validateAddresses(addressToValidate);

  //   expect(result).to.deep.equal({
  //     status: "verified",
  //     originalAddress: {
  //       name: "John Smith",
  //       companyName: "ShipStation",
  //       addressLine1: "3800 N Lamar Blvd",
  //       addressLine2: "#220",
  //       addressLine3: "",
  //       cityLocality: "Austin",
  //       stateProvince: "TX",
  //       postalCode: "78756",
  //       countryCode: "US",
  //       isResidential: false,
  //     },
  //     normalizedAddress: {
  //       name: "JOHN SMITH",
  //       companyName: "SHIPSTATION",
  //       addressLine1: "3800 N LAMAR BLVD STE 220",
  //       addressLine2: "",
  //       addressLine3: "",
  //       cityLocality: "AUSTIN",
  //       stateProvince: "TX",
  //       postalCode: "78756-0003",
  //       countryCode: "US",
  //       isResidential: false,
  //     },
  //     messages: [],
  //   });
  // });
});
