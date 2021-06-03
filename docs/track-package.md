Package Tracking
================================
[ShipEngine](www.shipengine.com) allows you to get real-time tracking and delivery information for *any* package, regardless of 
whether you created the package label through ShipEngine, so you know exactly where your package is and when it will arrive.

The `trackPackage` Method
--------------------------------------
The `trackPackage` method gives you information about a package and details about each of the tracking events that
occur, such as when the package is scanned by the carrier and when it is delivered. 

If you created the package label through ShipEngine, we recommend that you use the package's `packageId` to track the 
package so that we can provide as many details as possible about the package and its status. 

If you only have the tracking number and shipping carrier, ShipEngine can still retrieve the information you need
to ensure your package's whereabouts. 

Input Parameters
-------------------------------------
The `trackPackage` method can accept the `packageId` that was generated when you created the package label using
ShipEngine.
Either the `packageId` OR the `trackingNumber` AND `carrierCode` must be provided.

### Track by `packageId`



* `packageId` *required* <br>
  A *string* containing a valid ShipEngine package ID.


### Track by Tracking Number
The `trackPackage` method can accept the tracking number provided by the shipping carrier as well as the ShipEngine
code for that carrier.





Output
--------------------------------
The `validateAddress` method returns an address validation result object containing the properties listed below.
If you are using TypeScript, you can import the [`AddressValidationResult`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/address/public-types.ts#L123-L154)
type into your project to take advantage of your IDE's code completion functionality.

* `isValid` <br>
  A *boolean* indicating whether the address provided is valid.


* `normalizedAddress` <br>
  An object containing the normalized form of the address, according to the normalization rules of the country in which the address resides.
  This property will only be provided if the address is valid.

   <br>

    * `street` <br>
      An *array* containing the street address. Each string in the array is a separate line, up to 3. <br>

    * `country` <br>
      A *string* containing the [ISO 3166 country code]((https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)).

    * `postalCode`  <br>
      A *string* containing the postal code.

    * `cityLocality`  <br>
      A *string* containing the city or locality.

    * `stateProvince`  <br>
      A *string* containing the state or province.

    * `isResidential` <br>
      A *boolean* indicating whether the address is residential or commercial.
      If unknown, this field will be `undefined`.

    * `name` <br>
      A *string* containing the name of the sender or recipient at the address, if applicable.
      This field may be empty.

    * `phone` <br>
      A *string* containing the phone number associated with this address, if any.
      This field may be empty.

    * `companyName` <br>
      A *string* containing the company name, if this is a known business address.
      This field may be empty.

<br>

* `info` <br>
  An *array* of informational messages about the address validation, such as minor corrections.

* `warning` <br>
  An *array* of warning messages about the address validation, such as major changes that
  were made to the normalized address.

* `error` <br>
  An *array* of Error messages about the address validation, such as invalid fields that
  prevent the address from being fully validated.


Errors
======
The `validateAddress` method may throw a [`ShipEngineError`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/errors/shipengine-error.ts#L7-L44)
if there are issues with the input data, a network error, or a server error from the backend API.


Example
==============================
```
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function validateAddress() {

  const originalAdddress = {
    name: "John Doe",
    company: "Example Corp.",
    street: "525 S Winchester Blvd",
    cityLocality: "San Jose",
    stateProvince: "CA",
    country: "US",
  };
  
  try {
    const result = await shipengine.validateAddress(address);
    
    if (result.isValid) {
      // Success! Print the formatted address
      console.log("Successfully normalized the address!");
      console.log(result.normalizedAddress.toString());
   }
   else {
     // Bad address. Print the warning & error messages
     console.log("The address is not valid");
     console.log(result.warnings[0]);
     console.log(result.errors[0]);
   } 
  } catch (e) {
    console.log("Error validating address: ", e.message);
  }
}

validateAddress();
```

Example Output
-----------------------------------------------------

### Successful Address Validation
```{
  "isValid": true,
  "normalizedAddress": {
    "street": [
      "525 SOUTH WINCHESTER BLVD"
    ],
    "name": "JOHN DOE",
    "company": "EXAMPLE CORP.",
    "phone": "",
    "cityLocality": "SAN JOSE",
    "stateProvince": "CA",
    "postalCode": "95128",
    "country": "US",
    "isResidential": true
  },
  "info": [],
  "warnings": [],
  "errors": []
}
```

### Successful Address Validation with Warnings
```
{
  "isValid": true,
  "normalizedAddress": {
    "street": [
      "525 SOUTH WINCHESTER BLVD"
    ],
    "name": "JOHN DOE",
    "company": "EXAMPLE CORP.",
    "phone": "",
    "cityLocality": "SAN JOSE",
    "stateProvince": "CA",
    "postalCode": "95128",
    "country": "US",
    "isResidential": false
  },
  "info": [],
  "warnings": [
    "This address has been verified down to the house/building level (highest possible accuracy with the provided data)"
  ],
  "errors": []
}
```

### Unsuccessful Address Validation with Errors
```
{
  "isValid": false,
  "info": [],
  "warnings": [],
  "errors": [
    "Invalid City, State, or Zip"
  ]
}
```