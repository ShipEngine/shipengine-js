[![ShipEngine](https://shipengine.github.io/img/shipengine-logo-wide.png)](https://www.shipengine.com/)

ShipEngine JavaScript SDK
=====================================================
### The official ShipEngine JavaScript SDK for Node.js

[![npm](https://img.shields.io/npm/v/shipengine.svg)](https://www.npmjs.com/package/shipengine)
[![License](https://img.shields.io/npm/l/shipengine.svg)](LICENSE)

[![Build Status](https://github.com/ShipEngine/shipengine-js/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-js/actions)
[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-js/badge.svg?branch=main)](https://coveralls.io/github/ShipEngine/shipengine-js?branch=main)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-js.svg)](https://david-dm.org/ShipEngine/shipengine-js)

[![OS Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-js/actions)


> ⚠ **WARNING**: This is alpha software under active development. This repo is a successor to https://www.npmjs.com/package/shipengine. Until this has a stable release, we recommend you either stick to the current releases, or use the [ShipEngine API](https://www.shipengine.com/docs/) directly.



Quick Start
--------------------------
Install ShipEngine JavaScript SDK via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install shipengine-js
```

The only configuration requirement is an [API key](https://www.shipengine.com/docs/auth/#api-keys).

```javascript
const ShipEngine = require("shipengine-js");

const shipengine = new ShipEngine("___YOUR_API_KEY_HERE__");

```
Methods
-------------------------------
* [`createLabelFromRate`](./docs/create-label-from-rate.md) - When retrieving rates for shipments using the `getRates` method, the returned information contains a `rate_id` property that can be used to purchase a label without having to refill in the shipment information repeatedly.
* [`createLabel`](./docs/create-label.md) - Purchase and print a label for shipment.
* [`getRates`](./docs/get-rates.md) - Given some shipment details and rate options, this method returns a list of rate quotes.
* [`listCarrierAccounts`](./docs/list-carrier-accounts.md) - Returns a list of carrier accounts that have been connected through
the [ShipEngine dashboard](https://www.shipengine.com/docs/carriers/setup/).
* [`trackByLabelId`](./docs/track-by-label-id.md) - Track a package by its associated label ID.
* [`trackByTrackingNumber`](./docs/track-by-tracking-number.md) - Track a package by its associated trackng number.
* [`validateAddresses`](./docs/validate-addresses.md) - Indicates whether the provided addresses are valid. If the addresses are valid, the method returns a normalized version based on the standards of the country in which the address resides. If an address cannot be normalized, an error is returned.
* [`voidLabelById`](./docs/void-label-by-id.md) - Void a label by its ID.

Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [Open an issue](https://github.com/ShipEngine/shipengine-js/issues) on GitHub and [submit a pull request](https://github.com/ShipEngine/shipengine-js/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/ShipEngine/shipengine-js.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`<br><br>
Or you can use `npm run watch` to automatically re-build whenever source files change.

4. __Lint the code__<br>
`npm run lint`<br><br>
Or you can use `npm run lint:fix` to automatically fix most linting errors.

5. __Run the tests__<br>
`npm test`<br><br>
This runs tests in both Node.js and web browsers. Use `npm run test:node` to only run Node.js tests, or `npm run test:browser` to only run browser tests.
