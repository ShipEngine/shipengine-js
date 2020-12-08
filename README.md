[![ShipEngine](https://shipengine.github.io/img/shipengine-logo-wide.png)](https://shipengine.com)

# ShipEngine Isomorphic JS / Node SDK (unstable)

[![CI-CD Status](https://github.com/ShipEngine/shipengine-js/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-js/actions)
>

> ⚠ **WARNING**: This is alpha software under active development. This repo is a successor to https://www.npmjs.com/package/shipengine. Until this has a stable release, we recommend you either stick to the current releases, or use the [shipengine API](https://shipengine.github.io/shipengine-openapi/).

---

## Description

An isomorphic JS library written in _typescript_ and built on the [ShipEngine API](https://shipengine.com), offering low-level access as well as convenience methods.

---

## Quick Start

Install ShipEngine via [npm](https://www.npmjs.com/):
```
npm install shipengine@alpha
```

The only configuration requirement is an [API key](https://www.shipengine.com/docs/auth/#api-keys).
```ts
import ShipEngine from "shipengine"
// or, if you prefer commonjs
const ShipEngine = require('shipengine')


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
## Tutorials
- https://shipengine.github.io/shipengine-js

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
