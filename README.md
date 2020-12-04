[![ShipEngine](https://github.com/ShipEngine/shipengine.github.io/raw/main/img/shipengine-logo-wide.png)](https://shipengine.com)

# ShipEngine Isomorphic JS / Node SDK

[![Build Status](https://github.com/ShipEngine/shipengine-js/workflows/shipengine-js/badge.svg)](https://github.com/ShipEngine/shipengine-js/actions)

> ⚠ **WARNING**: This is alpha software under active development. `Caveat emptor` until a 0.1.0 release is ready.

An isomorphic JS library written in _typescript_ and built on the [ShipEngine API](https://shipengine.com), offering low-level access as well as convenience methods.


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

const isValid = shipengine.validateAddress({
  street: ['1 E 161 St'],
  country: 'US',
  cityLocality: 'The Bronx',
  postalCode: '10451',
  stateProvince: 'NY',
})

console.assert(isValid, 'Address should be valid!')


```

## Test

You must have [hoverfly](https://hoverfly.io/) installed globally and accessible in your path.
```
npm run test
```
## Lint
```
npm run lint
```
