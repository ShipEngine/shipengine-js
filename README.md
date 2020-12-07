[![ShipEngine](https://shipengine.github.io/img/shipengine-logo-wide.png)](https://shipengine.com)

# ShipEngine Isomorphic JS / Node SDK

[![Test Status](https://github.com/ShipEngine/shipengine-js/workflows/tests/badge.svg)](https://github.com/ShipEngine/shipengine-js/actions)


> ⚠ **WARNING**: This is alpha software under active development. `Caveat emptor` until a 1.0.0 release is ready.

An isomorphic JS library written in _typescript_ and built on the [ShipEngine API](https://shipengine.com), offering low-level access as well as convenience methods.

---

## Quick Start

Install ShipEngine via [npm](https://www.npmjs.com/):
```
npm install shipengine --save
```

The only configuration requirement is an [API key](https://www.shipengine.com/docs/auth/#api-keys).
```ts
import ShipEngine from "shipengine"
// or, if you prefer commonjs
const shipengine = require('shipengine')


const shipengine = ShipEngine('my_api_key')

shipengine
  .validateAddress({
    street: ["1 E 161 St"],
    country: "US",
    cityLocality: "The Bronx",
    postalCode: "10451",
    stateProvince: "NY",
  })
  .then((isValid) => console.log(isValid ? "valid!" : "invalid!"));

```

# Development / Contributions
## Running tests
Do `docker-compose up -d`.

If you for any reason do not want to use docker, you can also install hoverfly locally and run `hoverfly -webserver -response-body-files-path simengine`.

```
npm run test
```
## Lint
```
npm run lint
```
