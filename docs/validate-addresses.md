Validate Addresses
================================
[ShipEngine](www.shipengine.com) allows you to validate an address before using it to create a shipment to ensure
accurate delivery of your packages.

Address validation can lead to reduced shipping costs by preventing address correction
surcharges. ShipEngine cross-references multiple databases to validate addresses and identify potential delivery issues
and supports address validation for virtually every country on Earth, including the United States, Canada,
Great Britain, Australia, Germany, France, Norway, Spain, Sweden, Israel, Italy, and over 160 others.

The `validateAddress` Method
--------------------------------------
The `validateAddress` method allows you to determine whether an address is valid before using it for your shipments.
It accepts an address object containing typical address properties, described below, and will return a normalized address object
if the address is valid.

A normalized address contains the original address
normalized using the standards of the country in which the address resides. You may see changes to capitalization or abbreviations.
These changes are suggested
to ensure your address is best understood by the carrier systems that will read it.

Input Parameters
-------------------------------------

The `validateAddress` method accepts an address object containing the properties listed below.
If you are using TypeScript, you can import the [`Address`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/address/public-types.ts#L6-L54)
type into your project to take advantage of your
IDE's code completion functionality.

* `country` *required* <br>
A *string* containing a valid [two digit country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).


* `street` *required* <br>
The street address provided as a single string or as multiple strings in an array. It should be one of the following:<br>
  *  A *string* containing `0` to `1000` characters (i.e. `"4009 Marathon Blvd, Ste 200"`). <br>
  * An *array* containing `1` to `3` elements. Each element
should contain a *string* value containing `0` to `1000` characters. <br>
  (i.e. `["4009 Marathon Blvd", "Ste 200"]`).

**Either the `postalCode` OR the `cityLocality` AND `stateProvince` must be provided.**

* `postalCode`  <br>
A *string* between`0` to `1000` characters containing the postal code. <br>


* `cityLocality`  <br>
A *string* between `0` to `1000` characters containing the city or locality.<br>


* `stateProvince`  <br>
A *string* between `0` to `1000` characters containing the state or province.<br>


* `isResidential` <br>
A *boolean* value indicating whether this is a residential or commercial address. Leave `undefined` if unknown. <br>


* `name` <br>
A *string* between `0` and `1000` characters indicating the name of the sender or recipient at the address, if applicable.


* `phone` <br>
A *string* between `0` and `1000` characters indicating the phone number associated with this address, if any.


* `companyName` <br>
A *string* between `0` and `1000` characters indicating the company name, if this is a business address.


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