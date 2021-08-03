Create Label From Rate
======================================
When retrieving rates for shipments using the `getRatesWithShipmentDetails` method, the returned information contains a `rateId` property that can be used to purchase a label without having to refill in the shipment information repeatedly. Please see [our docs](https://www.shipengine.com/docs/labels/create-from-rate/) to learn more about creating shipping labels from rates.

Input Parameters
-------------------------------------

The `createLabelFromRate` method requires a `rateId`. If you are using TypeScript, you can import the [`CreateLabelFromRateTypes.Param`](https://github.com/ShipEngine/shipengine-js/blob/main/src/create-label-from-rate/types/public-params.ts)
type into your project to take advantage of your
IDE's code completion functionality.

Output
--------------------------------
The `createLabelFromRate` method returns the label that was created.
If you are using TypeScript, you can import the [`CreateLabelFromRateTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/create-label-from-rate/types/public-result.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function createLabelFromRate() {
  const params = {
    rateId: "se-786280140",
    validateAddress: "no_validation",
    labelLayout: "4x6",
    labelFormat: "pdf",
    labelDownloadType: "url",
    displayScheme: "label"
  }

  try {
    const result = await shipengine.createLabelFromRate(params);

    console.log("The label that was created:");
    console.log(result);
  } catch (e) {
    console.log("Error creating label: ", e.message);
  }
}

createLabelFromRate();
```

Example Output
-----------------------------------------------------

### Successful Create Label From Rate Result
```javascript
{
  labelId: 'se-75226253',
  status: 'completed',
  shipmentId: 'se-142144170',
  shipDate: '2021-07-29T00:00:00Z',
  createdAt: '2021-08-03T16:06:33.3111397Z',
  shipmentCost: { currency: 'usd', amount: 7.9 },
  insuranceCost: { currency: 'usd', amount: 0 },
  trackingNumber: '9405511899560334509514',
  isReturnLabel: false,
  rmaNumber: null,
  isInternational: false,
  batchId: '',
  carrierId: 'se-423887',
  chargeEvent: 'carrier_default',
  serviceCode: 'usps_priority_mail',
  packageCode: 'small_flat_rate_box',
  voided: false,
  voidedAt: null,
  labelFormat: 'pdf',
  displayScheme: 'label',
  labelLayout: '4x6',
  trackable: true,
  labelImageId: null,
  carrierCode: 'stamps_com',
  trackingStatus: 'in_transit',
  labelDownload: {
    href: 'https://api.shipengine.com/v1/downloads/10/-2HAzxfWI0yPIbbvQtmLkA/label-75226253.pdf',
    pdf: 'https://api.shipengine.com/v1/downloads/10/-2HAzxfWI0yPIbbvQtmLkA/label-75226253.pdf',
    png: 'https://api.shipengine.com/v1/downloads/10/-2HAzxfWI0yPIbbvQtmLkA/label-75226253.png',
    zpl: 'https://api.shipengine.com/v1/downloads/10/-2HAzxfWI0yPIbbvQtmLkA/label-75226253.zpl'
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
  ]
};
```
