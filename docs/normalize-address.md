Address Normalization
================================
[ShipEngine](www.shipengine.com) allows you to retrieve a normalized version of an address before using it to create a
shipping label. A normalized address has been standardized using the postal address standards. Using normalized addresses reduces issues related to invalid address formats.

Using normalized addresses can lead to reduced shipping costs by preventing address correction
surcharges. ShipEngine cross-references multiple databases to validate addresses and identify potential delivery issues
and supports address validation for virtually every country on Earth, including the United States, Canada,
Great Britain, Australia, Germany, France, Norway, Spain, Sweden, Israel, Italy, and over 160 others.

The `normalizeAddress` Method
------------------------------------------
The `normalizeAddress` method allows you to transform an address into a standard, or "normalized", format.

A normalized address contains the original address
normalized using the standards of the country in which the address resides. You may see changes to capitalization or abbreviations.
These changes are suggested
to ensure your address is best understood by the carrier systems that will read it.

Input Parameters
-----------------------------------

The `normalizeAddress` method accepts an address object containing the properties listed below.
If you are using TypeScript, you can import the [`Address`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/address/public-types.ts#L6-L54)
type into your project to take advantage of your
IDE's code completion functionality.


* `country` *required* <br>
  A *string* containing a valid [two digit country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

* `street` *required* <br>
  The street address provided as a single string or as multiple strings in an array. It should be one of the following:<br>

    * A *string* containing `0` to `1000` characters (i.e. `"4009 Marathon Blvd, Ste 200"`). <br>
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


* `company` <br>
  A *string* between `0` and `1000` characters indicating the company name, if this is a business address.


Output
---------------------------
If the address can be normalized, the `normalizeAddress` method returns a normalized version of the address. If you are using TypeScript, you can import the [NormalizedAddress]("./../src/address/public-types.ts") type into your project to take advantage of your IDE's code completion functionality.

* `street` <br>
  An *array* containing the street address. Each string in the array is a separate line, up to 3.<br>

* `country` <br>
  A *string* containing the [ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) country code.

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

* `company` <br>
  A *string* containing the company name, if this is a known business address.
  This field may be empty.


Errors
-----------------------
If the address is not valid or cannot be normalized properly, or if a network or server error is encounted, the `normalizeAddress` method will throw a [`ShipEngineError`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/errors/shipengine-error.ts#L7-L44).


Example
-----------------------
```
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function normalizeAddress() {

  const originalAdddress = {
    name: "John Doe",
    company: "Example Corp.",
    street: "525 S Winchester Blvd",
    cityLocality: "San Jose",
    stateProvince: "CA",
    country: "US",
  };
  
  try {
    // Convert the address to its normalized format
    const normalizedAddress = await shipengine.normalizeAddress(originalAddress);
    
    console.log("Successfully normalized the address!")
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

```                               

Example Output
===========================

### Successful Address Normalization
```
{
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
}
```