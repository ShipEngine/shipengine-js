Validate Addresses
================================
[ShipEngine](www.shipengine.com) allows you to validate an array of addresses before using it to create a shipment to ensure
accurate delivery of your packages. Please see [our docs](https://www.shipengine.com/docs/addresses/validation/) to learn more about validating addresses.

Input Parameters
-------------------------------------

The `validateAddresses` method accepts an array of addresses. If you are using TypeScript, you can import the [`ValidateAddressesTypes.Param`](https://github.com/ShipEngine/shipengine-js/blob/main/src/validate-addresses/types/public-params.ts)
type into your project to take advantage of your
IDE's code completion functionality.

Output
--------------------------------
The `validateAddresses` method returns an array of address validation result objects.
If you are using TypeScript, you can import the [`ValidateAddressesTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/validate-addresses/types/public-result.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function validateAddresses() {
  const params = [{
    name: "John Smith",
    companyName: "ShipStation",
    addressLine1: "3800 N Lamar Blvd",
    addressLine2: "#220",
    cityLocality: "Austin",
    stateProvince: "TX",
    postalCode: "78756",
    countryCode: "US",
    addressResidentialIndicator: "no",
  }];

  try {
    const result = await shipengine.validateAddresses(params);

    if (result[0].status === 'verified') {
      // Success! Print the formatted address
      console.log("Successfully normalized the address!");
      console.log(result);
   }
   else {
     // Bad address. Print the warning & error messages
     console.log("The address is not valid");
     console.log(result);
   }
  } catch (e) {
    console.log("Error validating address: ", e.message);
  }
}

validateAddresses();
```

Example Output
-----------------------------------------------------

### Successful Address Validation
```javascript
[
  {
    status: 'verified',
    originalAddress: {
      name: 'John Smith',
      phone: null,
      companyName: 'ShipStation',
      addressLine1: '3800 N Lamar Blvd',
      addressLine2: '#220',
      addressLine3: null,
      cityLocality: 'Austin',
      stateProvince: 'TX',
      postalCode: '78756',
      countryCode: 'US',
      addressResidentialIndicator: 'no'
    },
    normalizedAddress: {
      name: 'JOHN SMITH',
      phone: null,
      companyName: 'SHIPSTATION',
      addressLine1: '3800 N LAMAR BLVD STE 220',
      addressLine2: null,
      addressLine3: null,
      cityLocality: 'AUSTIN',
      stateProvince: 'TX',
      postalCode: '78756-0003',
      countryCode: 'US',
      addressResidentialIndicator: 'no'
    },
    messages: []
  }
]
```
