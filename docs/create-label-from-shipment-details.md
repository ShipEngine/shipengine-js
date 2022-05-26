Create Label From Shipment Details
======================================
[ShipEngine](www.shipengine.com) allows you programmatically create shipping labels. Please see [our docs](https://www.shipengine.com/docs/labels/create-a-label/) to learn more about creating shipping labels.

Input Parameters
-------------------------------------

The `createLabelFromShipmentDetails` method accepts shipment related params. If you are using TypeScript, you can import the [`CreateLabelFromShipmentDetailsTypes.Param`](https://github.com/ShipEngine/shipengine-js/blob/main/src/create-label-from-shipment-details/types/public-params.ts)
type into your project to take advantage of your
IDE's code completion functionality.

Output
--------------------------------
The `createLabelFromShipmentDetails` method returns the label that was created.
If you are using TypeScript, you can import the [`CreateLabelFromShipmentDetailsTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/create-label-from-shipment-details/types/public-result.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function createLabelFromShipmentDetails() {
  const params = {
    shipment: {
      serviceCode: "ups_ground",
      shipTo: {
        name: "Jane Doe",
        addressLine1: "525 S Winchester Blvd",
        cityLocality: "San Jose",
        stateProvince: "CA",
        postalCode: "95128",
        countryCode: "US",
        addressResidentialIndicator: "yes",
      },
      shipFrom: {
        name: "John Doe",
        companyName: "Example Corp",
        phone: "555-555-5555",
        addressLine1: "4009 Marathon Blvd",
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        countryCode: "US",
        addressResidentialIndicator: "no",
      },
      packages: [
        {
          weight: {
            value: 20,
            unit: "ounce",
          },
          dimensions: {
            height: 6,
            width: 12,
            length: 24,
            unit: "inch",
          },
        },
      ],
    },
  };


  try {
    const result = await shipengine.createLabelFromShipmentDetails(params);

    console.log("The label that was created:");
    console.log(result);
  } catch (e) {
    console.log("Error creating label: ", e.message);
  }
}

createLabelFromShipmentDetails();
```

Example Output
-----------------------------------------------------

### Successful Create Label Result
```javascript
{
  labelId: "se-75222480",
  status: "completed",
  shipmentId: "se-143901447",
  shipDate: "2021-08-03T00:00:00Z",
  createdAt: "2021-08-03T15:56:07.4911627Z",
  shipmentCost: { currency: "usd", amount: 27.98 },
  insuranceCost: { currency: "usd", amount: 0 },
  trackingNumber: "1Z63R0960335797865",
  isReturnLabel: false,
  rmaNumber: null,
  isInternational: false,
  batchId: "",
  carrierId: "se-423888",
  chargeEvent: "carrier_default",
  serviceCode: "ups_ground",
  packageCode: "package",
  voided: false,
  voidedAt: null,
  labelFormat: "pdf",
  displayScheme: "label",
  labelLayout: "4x6",
  trackable: true,
  labelImageId: null,
  carrierCode: "ups",
  trackingStatus: "in_transit",
  labelDownload: {
    href: "https://api.shipengine.com/v1/downloads/10/TotYAdWp30OfU_v35gT0KQ/label-75222480.pdf",
    pdf: "https://api.shipengine.com/v1/downloads/10/TotYAdWp30OfU_v35gT0KQ/label-75222480.pdf",
    png: "https://api.shipengine.com/v1/downloads/10/TotYAdWp30OfU_v35gT0KQ/label-75222480.png",
    zpl: "https://api.shipengine.com/v1/downloads/10/TotYAdWp30OfU_v35gT0KQ/label-75222480.zpl",
  },
  formDownload: null,
  insuranceClaim: null,
  packages: [
    {
      packageCode: "package",
      trackingNumber: "1Z63R0960335797865",
      weight: { value: 20, unit: "ounce" },
      dimensions: { unit: "inch", length: 24, width: 12, height: 6 },
      insuredValue: { currency: "usd", amount: 0 },
      labelMessages: { reference1: null, reference2: null, reference3: null },
      externalPackageId: null,
    },
  ],
};
```
