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

Quick Start
--------------------------
Install ShipEngine JavaScript SDK via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install shipengine
```

The only configuration requirement is an [API key](https://www.shipengine.com/docs/auth/#api-keys).

```javascript
const ShipEngine = require("shipengine");

const shipengine = new ShipEngine("___YOUR_API_KEY_HERE__");

```

Configuring the ShipEngine SDK
-------------------------------
* Be sure to configure the SDK if you would like to update things like `retries`, `timeouts`, and `page sizes` using the [`ShipEngine Config`](./src/config.ts) interface. Alternatively, you can simply pass in your ShipEngine API Key and use the default configuration.

```TypeScript
export interface ShipEngineConfig {
  /**
   * Your ShipEngine API key.
   *
   * This can be a production or sandbox key. Sandbox keys start with "TEST_".
   */
  apiKey: string;

  /**
   * ShipEngine child account API key (partner API)
   *
   * This can be a production or sandbox key. Sandbox keys start with "TEST_".
   */
  onBehalfOf?: string;

  /**
   * The URL of the ShipEngine API. You can usually leave this unset and it will
   * default to our public API.
   */
  baseURL?: string | URL;

  /**
   * Some ShipEngine API endpoints return paged data. This lets you control the
   * number of items returned per request. Larger numbers will use more memory
   * but will require fewer HTTP requests.
   *
   * Defaults to 50.
   */
  pageSize?: number;

  /**
   * If the ShipEngine client receives a rate limit error it can automatically
   * retry the request after a few seconds. This setting lets you control how
   * many times it will retry before giving up.
   *
   * Defaults to 1, which means up to 2 attempts will be made (the original
   * attempt, plus one retry).
   */
  retries?: number;

  /**
   * The maximum amount of time (in milliseconds) to wait for a response from
   * the ShipEngine server.
   *
   * Defaults to 5000 (5 seconds).
   */
  timeout?: number;
}
```

Methods
-------------------------------
* [`createLabelFromRate`](./docs/create-label-from-rate.md) - When retrieving rates for shipments using the `getRatesWithShipmentDetails` method, the returned information contains a `rateId` property that can be used to purchase a label without having to refill in the shipment information repeatedly.
* [`createLabelFromShipmentDetails`](./docs/create-label-from-shipment-details.md) - Purchase and print a label for shipment.
* [`getRatesWithShipmentDetails`](./docs/get-rates-with-shipment-details.md) - Given some shipment details and rate options, this method returns a list of rate quotes.
* [`listCarriers`](./docs/list-carriers.md) - Returns a list of carrier accounts that have been connected through
the [ShipEngine dashboard](https://www.shipengine.com/docs/carriers/setup/).
* [`trackUsingLabelId`](./docs/track-using-label-id.md) - Track a package by its associated label ID.
* [`trackUsingCarrierCodeAndTrackingNumber`](./docs/track-using-carrier-code-and-tracking-number.md) - Track a package for a given carrier and tracking number.
* [`validateAddresses`](./docs/validate-addresses.md) - Indicates whether the provided addresses are valid. If the addresses are valid, the method returns a normalized version based on the standards of the country in which the address resides. If an address cannot be normalized, an error is returned.
* [`voidLabelWithLabelId`](./docs/void-label-with-label-id.md) - Void a label with its Label ID.

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

Committing
-------------------------
This project adheres to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

Publishing
-------------------------
Publishing new versions of the SDK to [NPM](https://www.npmjs.com/package/shipengine) is handled on GitHub via the [Release Please](https://github.com/googleapis/release-please) GitHub Actions workflow. Learn more about about Release PRs, updating the changelog, and commit messages [here](https://github.com/googleapis/release-please#how-should-i-write-my-commits).
