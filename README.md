[![ShipEngine](https://shipengine.github.io/img/shipengine-logo-wide.png)](https://shipengine.com)

# ShipEngine Isomorphic JS / Node SDK (unstable)
![Build Status](https://img.shields.io/github/workflow/status/shipengine/shipengine-js/CI-CD/main?label=build)
[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-js/actions)

![Latest Alpha](https://img.shields.io/npm/v/shipengine/alpha)
![License](https://img.shields.io/github/license/shipengine/shipengine-js)

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
import ShipEngine from 'shipengine'
// or, if you prefer commonjs
const ShipEngine = require('shipengine')


const shipengine = new ShipEngine('my_api_key')


const isValid = await shipengine
  .validateAddress({
    street: '1 E 161 St',
    cityLocality: 'The Bronx',
    stateProvince: 'NY',
    postalCode: '10451',
    country: 'US'
  })

console.log(isValid ? 'valid!' : 'invalid!')

```
## Docs & Tutorials
- https://shipengine.github.io/shipengine-js

## Development / Contributions

### Cloning the repo
- fork the repository
- `git submodule update --init --recursive`
- submit a PR against `main`

### Optional
- if you use direnv, edit and rename .envrc.example.

### Upgrading node version
#### edit the following files:
- `package.json/engines, .nvmrc, shell.nix, README.md`

### Running tests
Do `npm run sim:start`

If you for any reason do not want to use docker, you can also install hoverfly locally and run `hoverfly -webserver -response-body-files-path simengine`.

```
npm run test
```
## Lint
```
npm run lint
```
