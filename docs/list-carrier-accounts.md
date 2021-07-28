Carrier Accounts
======================================
[ShipEngine](www.shipengine.com) allows you to connect
your own carrier accounts through the ShipEngine [dashboard](https://www.shipengine.com/docs/carriers/setup/).

A carrier account represents your account with
a specific carrier, such as FedEx, and includes the carrier's
name and code as well as your account number and any 
name you have assigned to this account. 

The `getCarriers` Method
-----------------------------------
The `getCarriers` method allows you to retrieve a list of
all the carriers you have connected to ShipEngine. You can 
optionally pass a particular `carrierCode` and retrieve only
your account(s) for that particular carrier. 

Input Parameters
--------------------------

The `getCarriers` method can be used with no input parameters to 
retrieve a list of *all* carriers that have been connected
using the ShipEngine dashboard. 

You may optionally pass the following parameter if you would 
like to retrieve only the account(s) for a particular carrier.

* `carrierCode` <br>
A *string* containing a valid ShipEngine carrier code. Valid values include the following:
  * access_worldwide
  * amazon_buy_shipping
  * amazon_shipping_uk
  * apc
  * asendia
  * australia_post
  * canada_post
  * dhl_ecommerce
  * dhl_express
  * dhl_express_australia
  * dhl_express_canada
  * dhl_express_uk
  * dpd
  * endicia
  * fedex
  * fedex_uk
  * firstmile
  * globegistics
  * imex
  * newgistics
  * on_trac
  * purolator_canada
  * royal_mail
  * rr_donnelley
  * seko
  * sendle
  * stamps_com
  * ups
  * usps
    
Output 
----------------------------
The `getAccounts` method returns an array of accounts containing the properties below. If no accounts have been
setup in the ShipEngine [dashboard](https://www.shipengine.com/docs/carriers/setup/) or if you
have no accounts set up for the provided `carrierCode`, and empty array with be returned.

* `id` <br>
A *string* containing the unique id for this carrier.
  
* `carrier` <br>
An *object* containing the following properties:
  *  `name` <br>
    A *string* containing the name of this carrier (i.e. United Parcel Service).
  * `code` <br>
    A *string* containing the `carrierCode` for this carrier (i.e. ups). This property will contain one of the values in the list above.
* `accountNumber` <br>
A *string* containing your account number with this carrier.
* `name` <br>
A * string* containing the nickname you assigned to this account when you connected it through the
  ShipEngine dashboard.

Errors
-----------------------------
This method will throw a [`ShipEngineError`](https://github.com/ShipEngine/shipengine-js/blob/dc2a6cd5dba7f3e62f35b9d2224270bb94700897/src/errors/shipengine-error.ts#L7-L44)
if you provide an invalid `carrierCode` or if a network or server error is encountered.

Example
-----------------------------
```
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function getCarrierAccounts() {
  
  try {
    const accounts = await shipengine.getCarrierAccounts();
    
    console.log("There are " + accounts.length + " carrier accounts");
    
    for (account in accounts) {
      console.log(account.id, account.carrier.code, account.carrier.name, account.accountNumber);
    }
    
  } catch (e) {
    console.log("Error getting accounts: ", e.message);  
  }
}

getCarrierAccounts();
```  

### Example with Parameter

```
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function getCarrierAccounts() {

  try {
    const accounts = await shipengine.getCarrierAccounts("ups");

    console.log("There are " + accounts.length + " carrier accounts");
    
    // accounts possibly contains a single item since we passed a carrierCode
    for (account in accounts) {
      console.log(account.id, account.carrier.code, account.carrier.name, account.accountNumber);
    }
  } catch (e) {
    console.log("Error getting accounts: ", e.message);
  }
}

getCarrierAccounts();
```

Example Output
----------------------------
```
[
  {
    "id": "car_1knseddGBrseWTiw",
    "carrier": {
      "name": "United Parcel Service",
      "code": "ups"
    },
    "accountNumber": "1169350",
    "name": "My UPS Account"
  },
  {
    "id": "car_2aca9f662b71be73e7b36",
    "carrier": {
      "name": "Federal Express",
      "code": "fedex"
    },
    "accountNumber": "41E-4928-29314AAX",
    "name": "FedEx Account #1"
  },
  {
    "id": "car_3a76b06902f812d14b33d6847",
    "carrier": {
      "name": "Federal Express",
      "code": "fedex"
    },
    "accountNumber": "41E-4911-851657ABW",
    "name": "FedEx Account #2"
  },
  {
    "id": "car_1knseddGBrseWTIw",
    "carrier": {
      "name": "United States Postal Service",
      "code": "usps"
    },
    "accountNumber": "46-751-342556",
    "name": "My USPS Account"
  },
  {
    "id": "car_d1dcrTN3c86Wpcfd82d161",
    "carrier": {
      "name": "United States Postal Service",
      "code": "stamps_com"
    },
    "accountNumber": "U-71297853228.125.1",
    "name": "My Stamps.com Account"
  }
]
```