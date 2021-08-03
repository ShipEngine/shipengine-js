Track Using Carrier Code and Tracking Number
======================================
[ShipEngine](www.shipengine.com) allows you to track a package for a given carrier and tracking number. Please see [our docs](https://www.shipengine.com/docs/tracking/) to learn more about tracking shipments.

Input Parameters
-------------------------------------

The `trackUsingCarrierCodeAndTrackingNumber` method requires the carrier code and tracking number of the shipment being tracked. If you are using TypeScript, you can import the [`TrackUsingCarrierCodeAndTrackingNumberTypes.Param`](https://github.com/ShipEngine/shipengine-js/blob/main/src/track-using-carrier-code-and-tracking-number/types/public.ts)
type into your project to take advantage of your
IDE's code completion functionality.

Output
--------------------------------
The `trackUsingCarrierCodeAndTrackingNumber` method returns tracking information associated with the shipment for the carrier code and tracking number.
If you are using TypeScript, you can import the [`TrackUsingCarrierCodeAndTrackingNumberTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/track-using-carrier-code-and-tracking-number/types/public.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function trackUsingCarrierCodeAndTrackingNumber() {
  try {
    const result = await shipengine.trackUsingCarrierCodeAndTrackingNumber({carrierCode: "stamps_com", trackingNumber: "9405511899223197428490"});

    console.log("Tracking info:");
    console.log(result);
  } catch (e) {
    console.log("Error tracking shipment: ", e.message);
  }
}

trackUsingCarrierCodeAndTrackingNumber();
```

Example Output
-----------------------------------------------------

### Tracking Result
```javascript
{
  trackingNumber: "332980205337",
  statusCode: "DE",
  statusDescription: "Delivered",
  carrierStatusCode: "Delivery",
  carrierDetailCode: null,
  carrierStatusDescription: "Shipment delivered",
  shipDate: null,
  estimatedDeliveryDate: null,
  actualDeliveryDate: "2021-06-17T05:04:39Z",
  exceptionDescription: null,
  events: [
    {
      occurredAt: "2021-07-23T12:42:00Z",
      carrierOccurredAt: "2021-07-23T07:42:00",
      description: "Out for Delivery, Expected Delivery by 9:00pm",
      cityLocality: "MCKINNEY",
      stateProvince: "TX",
      postalCode: "75071",
      countryCode: null,
      companyName: null,
      signer: null,
      eventCode: "OF",
      statusCode: null,
      carrierStatusCode: "OF",
      carrierDetailCode: null,
      latitude: 33.175,
      longitude: -96.6986,
    },
    {
      occurredAt: "2021-07-23T12:31:00Z",
      carrierOccurredAt: "2021-07-23T07:31:00",
      description: "Arrived at Post Office",
      cityLocality: "MCKINNEY",
      stateProvince: "TX",
      postalCode: "75070",
      countryCode: null,
      companyName: null,
      signer: null,
      eventCode: "07",
      statusCode: null,
      carrierStatusCode: "07",
      carrierDetailCode: null,
      latitude: 33.175,
      longitude: -96.6986,
    },
  ],
}
```
