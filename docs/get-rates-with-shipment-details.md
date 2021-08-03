Get Rates With Shipment Details
======================================
Given some shipment details and rate options, this method returns a list of rate quotes. Please see [our docs](https://www.shipengine.com/docs/rates/) to learn more about calculating rates.

Input Parameters
-------------------------------------

The `getRatesWithShipmentDetails` method accepts shipment related params. If you are using TypeScript, you can import the [`GetRatesWithShipmentDetailsTypes.Param`](https://github.com/ShipEngine/shipengine-js/blob/main/src/get-rates-with-shipment-details/types/public-params.ts)
type into your project to take advantage of your
IDE's code completion functionality.

Output
--------------------------------
The `getRatesWithShipmentDetails` method returns the rates that were calculated for the given shipment params.
If you are using TypeScript, you can import the [`GetRatesWithShipmentDetailsTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/get-rates-with-shipment-details/types/public-result.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function getRatesWithShipmentDetails() {
  const params = {
    rateOptions: {
      carrierIds: ["se-423888"]
    },
    shipment: {
      validateAddress: "no_validation",
      shipTo: {
        name: "Amanda Miller",
        phone: "555-555-5555",
        addressLine1: "525 S Winchester Blvd",
        cityLocality: "San Jose",
        stateProvince: "CA",
        postalCode: "95128",
        countryCode: "US",
        addressResidentialIndicator: "yes",
      },
      shipFrom: {
        companyName: "Example Corp.",
        name: "John Doe",
        phone: "111-111-1111",
        addressLine1: "4009 Marathon Blvd",
        addressLine2: "Suite 300",
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        countryCode: "US",
        addressResidentialIndicator: "no",
      },
      packages: [
        {
          weight: {
            value: 1.0,
            unit: "ounce",
          },
        },
      ],
    },
  };

  try {
    const result = await shipengine.getRatesWithShipmentDetails(params);

    console.log("The rates that were created:");
    console.log(result);
  } catch (e) {
    console.log("Error creating rates: ", e.message);
  }
}

getRatesWithShipmentDetails();
```

Example Output
-----------------------------------------------------

### Successful Get Rates Result
```javascript
{
  shipmentId: "se-144012114",
  carrierId: "se-423888",
  serviceCode: null,
  externalOrderId: null,
  items: [],
  taxIdentifiers: null,
  externalShipmentId: null,
  shipDate: "2021-08-03T00:00:00Z",
  createdAt: "2021-08-03T19:00:20.327Z",
  modifiedAt: "2021-08-03T19:00:20.327Z",
  shipmentStatus: "pending",
  shipTo: {
    name: "Amanda Miller",
    phone: "555-555-5555",
    companyName: null,
    addressLine1: "525 S Winchester Blvd",
    addressLine2: null,
    addressLine3: null,
    cityLocality: "San Jose",
    stateProvince: "CA",
    postalCode: "95128",
    countryCode: "US",
    addressResidentialIndicator: "yes",
  },
  shipFrom: {
    name: "John Doe",
    phone: "111-111-1111",
    companyName: "Example Corp.",
    addressLine1: "4009 Marathon Blvd",
    addressLine2: "Suite 300",
    addressLine3: null,
    cityLocality: "Austin",
    stateProvince: "TX",
    postalCode: "78756",
    countryCode: "US",
    addressResidentialIndicator: "unknown",
  },
  warehouseId: null,
  returnTo: {
    name: "John Doe",
    phone: "111-111-1111",
    companyName: "Example Corp.",
    addressLine1: "4009 Marathon Blvd",
    addressLine2: "Suite 300",
    addressLine3: null,
    cityLocality: "Austin",
    stateProvince: "TX",
    postalCode: "78756",
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
      weight: { value: 1, unit: "ounce" },
      dimensions: { unit: "inch", length: 0, width: 0, height: 0 },
      insuredValue: { currency: "usd", amount: 0 },
      trackingNumber: null,
      labelMessages: { reference1: null, reference2: null, reference3: null },
      externalPackageId: null,
    },
  ],
  totalWeight: { value: 1, unit: "ounce" },
  rateResponse: {
    rates: [
      {
        rateId: "se-795561307",
        rateType: "shipment",
        carrierId: "se-423888",
        shippingAmount: { currency: "usd", amount: 32.57 },
        insuranceAmount: { currency: "usd", amount: 0 },
        confirmationAmount: { currency: "usd", amount: 0 },
        otherAmount: { currency: "usd", amount: 0 },
        taxAmount: null,
        zone: null,
        packageType: null,
        deliveryDays: 3,
        guaranteedService: true,
        estimatedDeliveryDate: "2021-08-06T23:00:00Z",
        carrierDeliveryDays: "Friday 8/6 by 11:00 PM",
        shipDate: "2021-08-03T00:00:00Z",
        negotiatedRate: false,
        serviceType: "UPS 3 Day Select®",
        serviceCode: "ups_3_day_select",
        trackable: true,
        carrierCode: "ups",
        carrierNickname: "ShipEngine Test Account - UPS",
        carrierFriendlyName: "UPS",
        validationStatus: "valid",
        warningMessages: [],
        errorMessages: [],
      },
      {
        rateId: "se-795561308",
        rateType: "shipment",
        carrierId: "se-423888",
        shippingAmount: { currency: "usd", amount: 129.13 },
        insuranceAmount: { currency: "usd", amount: 0 },
        confirmationAmount: { currency: "usd", amount: 0 },
        otherAmount: { currency: "usd", amount: 0 },
        taxAmount: null,
        zone: null,
        packageType: null,
        deliveryDays: 1,
        guaranteedService: true,
        estimatedDeliveryDate: "2021-08-04T08:00:00Z",
        carrierDeliveryDays: "Tomorrow by 08:00 AM",
        shipDate: "2021-08-03T00:00:00Z",
        negotiatedRate: false,
        serviceType: "UPS Next Day Air® Early",
        serviceCode: "ups_next_day_air_early_am",
        trackable: true,
        carrierCode: "ups",
        carrierNickname: "ShipEngine Test Account - UPS",
        carrierFriendlyName: "UPS",
        validationStatus: "valid",
        warningMessages: [],
        errorMessages: [],
      },
      {
        rateId: "se-795561309",
        rateType: "shipment",
        carrierId: "se-423888",
        shippingAmount: { currency: "usd", amount: 16.58 },
        insuranceAmount: { currency: "usd", amount: 0 },
        confirmationAmount: { currency: "usd", amount: 0 },
        otherAmount: { currency: "usd", amount: 0 },
        taxAmount: null,
        zone: null,
        packageType: null,
        deliveryDays: 4,
        guaranteedService: true,
        estimatedDeliveryDate: "2021-08-09T23:00:00Z",
        carrierDeliveryDays: "Monday 8/9 by 11:00 PM",
        shipDate: "2021-08-03T00:00:00Z",
        negotiatedRate: false,
        serviceType: "UPS® Ground",
        serviceCode: "ups_ground",
        trackable: true,
        carrierCode: "ups",
        carrierNickname: "ShipEngine Test Account - UPS",
        carrierFriendlyName: "UPS",
        validationStatus: "valid",
        warningMessages: [],
        errorMessages: [],
      },
      {
        rateId: "se-795561310",
        rateType: "shipment",
        carrierId: "se-423888",
        shippingAmount: { currency: "usd", amount: 83.76 },
        insuranceAmount: { currency: "usd", amount: 0 },
        confirmationAmount: { currency: "usd", amount: 0 },
        otherAmount: { currency: "usd", amount: 0 },
        taxAmount: null,
        zone: null,
        packageType: null,
        deliveryDays: 1,
        guaranteedService: true,
        estimatedDeliveryDate: "2021-08-04T23:00:00Z",
        carrierDeliveryDays: "Tomorrow by 11:00 PM",
        shipDate: "2021-08-03T00:00:00Z",
        negotiatedRate: false,
        serviceType: "UPS Next Day Air Saver®",
        serviceCode: "ups_next_day_air_saver",
        trackable: true,
        carrierCode: "ups",
        carrierNickname: "ShipEngine Test Account - UPS",
        carrierFriendlyName: "UPS",
        validationStatus: "valid",
        warningMessages: [],
        errorMessages: [],
      },
      {
        rateId: "se-795561311",
        rateType: "shipment",
        carrierId: "se-423888",
        shippingAmount: { currency: "usd", amount: 96.58 },
        insuranceAmount: { currency: "usd", amount: 0 },
        confirmationAmount: { currency: "usd", amount: 0 },
        otherAmount: { currency: "usd", amount: 0 },
        taxAmount: null,
        zone: null,
        packageType: null,
        deliveryDays: 1,
        guaranteedService: true,
        estimatedDeliveryDate: "2021-08-04T10:30:00Z",
        carrierDeliveryDays: "Tomorrow by 10:30 AM",
        shipDate: "2021-08-03T00:00:00Z",
        negotiatedRate: false,
        serviceType: "UPS Next Day Air®",
        serviceCode: "ups_next_day_air",
        trackable: true,
        carrierCode: "ups",
        carrierNickname: "ShipEngine Test Account - UPS",
        carrierFriendlyName: "UPS",
        validationStatus: "valid",
        warningMessages: [],
        errorMessages: [],
      },
      {
        rateId: "se-795561312",
        rateType: "shipment",
        carrierId: "se-423888",
        shippingAmount: { currency: "usd", amount: 41.24 },
        insuranceAmount: { currency: "usd", amount: 0 },
        confirmationAmount: { currency: "usd", amount: 0 },
        otherAmount: { currency: "usd", amount: 0 },
        taxAmount: null,
        zone: null,
        packageType: null,
        deliveryDays: 2,
        guaranteedService: true,
        estimatedDeliveryDate: "2021-08-05T23:00:00Z",
        carrierDeliveryDays: "Thursday 8/5 by 11:00 PM",
        shipDate: "2021-08-03T00:00:00Z",
        negotiatedRate: false,
        serviceType: "UPS 2nd Day Air®",
        serviceCode: "ups_2nd_day_air",
        trackable: true,
        carrierCode: "ups",
        carrierNickname: "ShipEngine Test Account - UPS",
        carrierFriendlyName: "UPS",
        validationStatus: "valid",
        warningMessages: [],
        errorMessages: [],
      },
    ],
    invalidRates: [],
    rateRequestId: "se-86697154",
    shipmentId: "se-144012114",
    createdAt: "2021-08-03T19:00:21.3862989Z",
    status: "completed",
    errors: [],
  },
};
```
