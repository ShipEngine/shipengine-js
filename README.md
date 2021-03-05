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

### Publishing workflow
Note: These things more or less happen automatically with `npm run tag-and-release`.
1. Bump `version` in package.json to v1.0.0
2. If no longer publishing an alpha or beta, make sure to change the `tag: alpha` to `tag: latest` line in the [cicd.yaml](.github/workflows/cicd.yaml). This refers the npm `dist-tag`; for example, if the release getting published on npm as `v1.0.0@latest`, the dist-tag would be the word `latest`. This allows a consumer to do `npm install shipengine-js@latest --save`, and npm will serve up the latest version. See  [JS-DevTools/npm-publish](https://github.com/JS-DevTools/npm-publish#input-parameters) for more information.

3. Do the following
```sh
git checkout -b main
git commit -m release v1.0.0
git tag -l v1.0.0
git push --tags origin HEAD
```
4. Now, the github action publish job should start automatically. This happens whenever it detects a new package.json version on a push to `main`.
5. After the npm publish job completes, create a github release and write release notes. Assign the release to the appropriate git tag.

### Releasing new Alpha versions
- Install the [github client](https://github.com/cli/cli).
- Once `main` is in a state where we want to release.
  - `npm run tag-and-release` (justs run `scripts/release.sh`)

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

If you for any reason do not want to use docker, you can also install hV

```
npm run test
```
## Lint
```
npm run lint
```
