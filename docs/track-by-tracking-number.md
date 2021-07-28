Track By Tracking Number
================================
[ShipEngine](www.shipengine.com) allows you to get real-time tracking and delivery information for *any* package, regardless of
whether you created the package label through ShipEngine, so you know exactly where your package is and when it will arrive.

The `trackPackage` Method
--------------------------------------
The `trackPackage` method gives you information about a package and details about each of the tracking events that
have occurred, such as when the package is scanned by the carrier and when it is delivered.

If you created the package label through ShipEngine, we recommend that you use the package's `packageId` to track the
package so that we can provide as many details as possible about the package and its status.

If you only have the tracking number and shipping carrier, ShipEngine can still retrieve the information you need
to ensure your package's whereabouts.

Input Parameters
-------------------------------------
The `trackPackage` method can accept either the `packageId` that was generated when you created the package label using
ShipEngine *OR* it can accept a `trackingNumber` and `carrierCode`.

### Track by `packageId`
* `packageId` *required* <br>
A *string* containing a valid ShipEngine package ID.

### Track by `trackingNumber` and `carrierCode`
* `trackingNumber` *required* <br>
A *string* containing the tracking number provided by the carrier.

* `carrierCode` *required* <br>
A string containing the ShipEngine carrier code for the carrier that provided the tracking number.


#### Carrier Codes

| Carrier Name  | `carrierCode` |
|--------------|--------------|
|Access Worldwide | `access_worldwide`|
Amazon Buy Shipping | `amazon_buy_shipping`|
Amazon Shipping UK | `amazon_shipping_uk`|
APC | `apc`|
Asendia | `asendia`|
Australia Post | `australia_post`|
Canada Post | `canada_post`|
DHL Ecommerce | `dhl_ecommerce`|
DHL Express | `dhl_express`|
DHL Express Australia | `dhl_express_australia`|
DHL Express Canada | `dhl_express_canada`|
DHL Express UK | `dhl_express_uk`|
DPD | `dpd`|
Endicia | `endicia`|
FedEx | `fedex`|
FedEx UK | `fedex_uk`|
First Mile | `first_mile`|
Globegistics | `globgistics`|
Imex | `imex`|
Newgistics | `newgistics`|
OnTrac | `on_trac`|
Purolator Canada | `purolator_canada`|
Royal Mail | `royal_mail`|
RR Donnelley | `rr_donnelley`|
Seko | `seko`|
Sendle | `sendle`|
Stamps.com | `stamps_com`|
|UPS | `ups`|
|USPS | `usps`|


Output
--------------------------------
The `trackPackage` method returns a tracking result object containing the properties listed below.
If you are using TypeScript| you can import the [TrackPackageResult](https://github.com/ShipEngine/shipengine-js/blob/6f8f5cb66f69e5b3a4aef268b69fda9900cbc9aa/src/track/public-types.ts#L74)
type into your project to take advantage of your IDE's code completion functionality.

* `shipment`
  An *object* representing the shipment details associated with this package.
    <br> <br>
    *  `shipmentId` <br>
    A *string* containing the ShipEngine ID for the shipment associated with this package.
       <br> <br>
       This property
       will be *undefined* if you are tracking by `trackingNumber` and `carrierCode`.
       <br>
    *  `carrierId` <br>
    A *string* containing the ShipEngine ID for the shipping carrier who is delivering this package.
    <br>
    This property
       will be *undefined* if you are tracking by `trackingNumber` and `carrierCode`.
       <br>
       <br>
    *  `carrierAccount`
    An *object* containing information about the carrier who is delivering this package.
   <br>
   This property will be *undefined* if you are tracking by `trackingNumber` and `carrierCode`.
       <br>
       * `id`  <br>
       A *string* containing the ShipEngine ID for this carrier.
       <br> <br>
       *  `carrier`
       An *object* identifying the carrier.
       <br> <br>
          * `name`
           A *string* containing the name of the carrier (i.e. FedEx).<br> <br>
          * `code`
         A *string* containing the ShipEngine `carrierCode` associated with this carrier.
        <br> <br>
       * `accountNumber`
      A *string* containing your account number with the carrier.
        <br> <br>
       * `name`
    A *string* containing the nickname you gave to this account when you connected the carrier to your ShipEngine account.
    <br> <br>
  * `estimatedDeliveryDate` <br>
    An *object* representing the estimated delivery date and time.
      <br> <br>
      * `value` <br>
      The [ISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value of this date.
      * `hasTime` <br>
        <br>
      A *boolean* value indicated whether the value includes a timestamp. <br>
        <br>
      * `hasTimeZone` <br>
      A *boolean* value indicating whether the value includes a timezone. <br>
        <br>
      * `toString()` <br>
      A *function* used to get the string representation of this value. <br>
        <br>
  * `actualDeliveryDateTime` <br>
    An *object* representing the actual delivery date and time.
    <br>
    <br>
    This property will be *undefined* if the package is still
    in transit.
    <br> <br>
    * `value` <br>
      The [ISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value of this date.
      <br>
    * `hasTime` <br>
      A *boolean* value indicated whether the value includes a timestamp.
      <br> <br>
    * `hasTimeZone` <br>
      A *boolean* value indicating whether the value includes a timezone.
      <br> <br>
    * `toString()` <br>
      A *function* used to get the string representation of this value.
      <br> <br>
* `package` <br>
An *object* containing information about the physical package.
  <br> <br>
  * `packageId` <br>
  A *string* containing the ShipEngine ID for this package.
    <br><br>
    This property will be *undefined* if you
    are tracking by `trackingNumber` and `carrierCode`.
    <br> <br>
  * `trackingNumber` <br>
  A *string* containing the carrier's tracking number for this package.
    <br> <br>
  `trackingURl` <br>
  A *string* containing a URL you can use to get the latest tracking information directly from the carrier.
    <br> <br>
 * `weight` <br>
  An *object* representing the weight of the package.
  <br>
  This property will be *undefined* if you
  are tracking by `trackingNumber` and `carrierCode`.
   <br><br>
    * `value`
    A *number* containing the value of the weight in the specified `unit`.
    <br><br>
    * `unit`
    A *string* containing the unit of measure for the specified `value`.
      Possible values include the following:
      * `lb` - pound
      * `oz` - ounce
      * `gram`- gram
      * `kg` - kilogram
  <br><br>
  * `dimensions`
  An *object* representing the dimensions of this package.
  <br><br>
  This property will be *undefined* if you
  are tracking by `trackingNumber` and `carrierCode`.
  <br><br>
    * `length`
    A *number* containing the length of this package.
    <br><br>
    * `width`
    A *number* containing the width of this package.
    <br><br>
    * `height`
    A *number* containing the height of this package.
    <br>
    * `unit`
    A *string* containing the unit of measure for the dimensions .
    Possible values include the following:
      * `in` - inch
      * `cm` - centimeter
    <br><br>
* `events[]` <br>
An *array of objects* representing the individual tracking events that have occurred for this package.
<br><br>
  * `dateTime`
  An *object* representing the date and time that this event occurred.
    <br><br>
    * `value` <br>
    The [ISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value of this date.
    <br>
    * `hasTime` <br>
      A *boolean* value indicated whether the value includes a timestamp.
      <br> <br>
    * `hasTimeZone` <br>
      A *boolean* value indicating whether the value includes a timezone.
      <br> <br>
    * `toString()` <br>
      A *function* used to get the string representation of this value.
      <br> <br>
  * `carrierDateTime`
  An *object* representing the date and time the carrier recorded this event.
    <br><br>
    * `value` <br>
      The [ISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) value of this date.
      <br>
    * `hasTime` <br>
      A *boolean* value indicated whether the value includes a timestamp.
      <br> <br>
    * `hasTimeZone` <br>
      A *boolean* value indicating whether the value includes a timezone.
      <br> <br>
    * `toString()` <br>
      A *function* used to get the string representation of this value.
      <br> <br>
  * `status`
  A *string* containing ShipEngine's status for this event (i.e. Delivered).
  <br><br>
  * `description`
  A *string* containing ShipEngine's description of this event. May be `undefined`.
  <br><br>
  * `carrierStatusCode`
  A *string* containing the carrier's status for this event. (i.e. IN TRANSIT). May be `undefined`.
  <br><br>
  * `carrierDetailCode`
  A *string* containing the carrier's detail code for this event.
  <br><br>
  * `signer`
  A *string* containing the name of the person who signed for this package, if any. May be `undefined`.
  <br><br>
  * `location`
  An *object* representing the location where this event occurred. May be `undefined`.
  <br><br>
    * `cityLocality`
    A *string* containing the city or locality where this event occurred. May be `undefined`.
    <br><br>
    * `stateProvince`
    A *string* containing the state or province where this event occurred. May be `undefined`.
    <br><br>
    * `postalCode`
    A *string* containing the postal code where this event occurred. May be `undefined`.
    <br><br>
   * `countryCode`
   A *string* containing the [ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) country code
     where this event occurred. May be `undefined`.
   <br><br>
   * `coordinates`
   An *object* containing the geo-coordinates for this location. May be `undefined`.
   <br><br>
     * `latitude`
     A *number* containing the latitude for the coordinates.
     <br><br>
     * `longitude`
     A *string* containing the longitude for the coordinates. May be `undefined`.
     <br><br>
 * `latestEvent` <br>
 An `Event` object representing the most recent tracking event for this package. May be `undefined`.
 <br><br>
 * `hasErrors`
 A *boolean* indicating whether or not any tracking error events have occurred.
 <br><br>
 * `errors[]`
 An *array* containing tracking error events. May be empty.

Errors
======
The `trackPackage` method may throw a [`ShipEngineError`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/errors/shipengine-error.ts#L7-L44)
if there are issues with the input data, a network error, or a server error from the backend API.


Example
==============================
```
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function trackPackage() {

  try {
    const result = await shipengine.trackPackage('pkg_kfUjTZSEAQ8gHeT');

    if (!result.hasErrors) {
      // Success! No tracking errors encountered
      console.log('No tracking error events occurred.');
      console.log('The estimated delivery date is ' + result.estimatedDeliveryDate);
   }
   else {
     // One or more events had an error
    console.log('One or more errors occured.').
    console.log('This is the most recent tracking event' + JSON.stringify(result.latestEvent));
  } catch (e) {
    console.log("Error tracking package: ", e.message);
  }
}

trackPackage();
```

Example Output
-----------------------------------------------------
```{
  "shipment": {
    "shipmentId": "shp_UBZj2XiqQSSwSX9",
    "carrierId": "car_kfUjTZSEAQ8gHeT",
    "carrier": {
      "code": "fedex",
      "name": "Federal Express"
    },
    "carrierAccount": {
      "id": "car_kfUjTZSEAQ8gHeT",
      "carrier": {
        "name": "Federal Express",
        "code": "fedex"
      },
      "accountNumber": "41E-4928-29314AAX",
      "name": "FedEx Account #1"
    },
    "estimatedDeliveryDateTime": {
      "value": "2021-06-08T21:00:00.000Z",
      "hasTime": true,
      "hasTimeZone": true
    },
    "actualDeliveryDateTime": {
      "value": "2021-06-05T19:00:00.000Z",
      "hasTime": true,
      "hasTimeZone": true
    }
  },
  "package": {
    "packageId": "pkg_1FedExDeLivered",
    "trackingNumber": "MagfqUBZj2XiqQSSwSX9qwY6sdU29t",
    "trackingURL": "https://www.fedex.com/track/MagfqUBZj2XiqQSSwSX9qwY6sdU29t",
    "weight": {
      "unit": "kilogram",
      "value": 56
    },
    "dimensions": {
      "unit": "inch",
      "height": 17,
      "length": 36,
      "width": 34
    }
  },
  "events": [
    {
      "dateTime": {
        "value": "2021-06-03T19:00:00.000Z",
        "hasTime": true,
        "hasTimeZone": true
      },
      "carrierDateTime": {
        "value": "2021-06-04T01:00:00",
        "hasTime": true,
        "hasTimeZone": false
      },
      "status": "accepted",
      "description": "Dropped-off at shipping center",
      "carrierStatusCode": "ACPT-2",
      "carrierDetailCode": "PU7W",
      "signer": "",
      "location": {
        "cityLocality": "",
        "stateProvince": "",
        "postalCode": "",
        "countryCode": "",
        "coordinates": {
          "latitude": 0,
          "longitude": 0
        }
      }
    },
    {
      "dateTime": {
        "value": "2021-06-04T01:00:00.000Z",
        "hasTime": true,
        "hasTimeZone": true
      },
      "carrierDateTime": {
        "value": "2021-06-04T07:00:00",
        "hasTime": true,
        "hasTimeZone": false
      },
      "status": "in_transit",
      "description": "En-route to distribution center hub",
      "carrierStatusCode": "ER00P",
      "carrierDetailCode": "",
      "signer": "",
      "location": {
        "cityLocality": "",
        "stateProvince": "",
        "postalCode": "",
        "countryCode": "",
        "coordinates": {
          "latitude": 0,
          "longitude": 0
        }
      }
    },
    {
      "dateTime": {
        "value": "2021-06-04T20:00:00.000Z",
        "hasTime": true,
        "hasTimeZone": true
      },
      "carrierDateTime": {
        "value": "2021-06-05T02:00:00",
        "hasTime": true,
        "hasTimeZone": false
      },
      "status": "unknown",
      "description": "Mechanically sorted",
      "carrierStatusCode": "MMSa",
      "carrierDetailCode": "00004134918400045",
      "signer": "",
      "location": {
        "cityLocality": "",
        "stateProvince": "",
        "postalCode": "",
        "countryCode": "",
        "coordinates": {
          "latitude": 0,
          "longitude": 0
        }
      }
    },
    {
      "dateTime": {
        "value": "2021-06-05T10:00:00.000Z",
        "hasTime": true,
        "hasTimeZone": true
      },
      "carrierDateTime": {
        "value": "2021-06-05T16:00:00",
        "hasTime": true,
        "hasTimeZone": false
      },
      "status": "in_transit",
      "description": "On vehicle for delivery",
      "carrierStatusCode": "OFD-22",
      "carrierDetailCode": "91R-159E",
      "signer": "",
      "location": {
        "cityLocality": "",
        "stateProvince": "",
        "postalCode": "",
        "countryCode": "",
        "coordinates": {
          "latitude": 0,
          "longitude": 0
        }
      }
    },
    {
      "dateTime": {
        "value": "2021-06-05T19:00:00.000Z",
        "hasTime": true,
        "hasTimeZone": true
      },
      "carrierDateTime": {
        "value": "2021-06-06T01:00:00",
        "hasTime": true,
        "hasTimeZone": false
      },
      "status": "delivered",
      "description": "Delivered",
      "carrierStatusCode": "DV99-0004",
      "carrierDetailCode": "",
      "signer": "John P. Doe",
      "location": {
        "cityLocality": "",
        "stateProvince": "",
        "postalCode": "12345",
        "countryCode": "",
        "coordinates": {
          "latitude": 39.2271052,
          "longitude": 39.2271052
        }
      }
    }
  ],
  "latestEvent": {
    "dateTime": {
      "value": "2021-06-05T19:00:00.000Z",
      "hasTime": true,
      "hasTimeZone": true
    },
    "carrierDateTime": {
      "value": "2021-06-06T01:00:00",
      "hasTime": true,
      "hasTimeZone": false
    },
    "status": "delivered",
    "description": "Delivered",
    "carrierStatusCode": "DV99-0004",
    "carrierDetailCode": "",
    "signer": "John P. Doe",
    "location": {
      "cityLocality": "",
      "stateProvince": "",
      "postalCode": "12345",
      "countryCode": "",
      "coordinates": {
        "latitude": 39.2271052,
        "longitude": 39.2271052
      }
    }
  },
  "hasErrors": false,
  "errors": []
}
```

