@code_type typescript .ts
@comment_type /* %s */
@add_css docs/css/normalize.css
@add_css docs/css/fonts.css
@add_css docs/css/milligram.css
@add_css docs/css/main.css

# Validate and Normalize Addresses

In this tutorial we will learn how to validate and normalize addreses with the [ShipEngine](https://www.shipengine.com/) library.

## Install the ShipEngine library

--- install
```bash
npm install shipengine@alpha
```
---

## Initialize the ShipEngine library

--- initialize
```ts
const ShipEngine = require('shipengine');

const shipengine = ShipEngine('my_api_key');
```
---

## Validate an Address

You might want to validate that an address is correct.
The simplest way to accomplish this is by calling [validateAddress](../api/classes/addressesservice.html#validateaddress) with the necessary information to build an [Address](../api/classes/address.html).

--- validate address args
```ts
const isValid = await shipengine.validateAddress({
    street: '1 E 161 St',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
    country: 'US'
  })

console.log(isValid ? 'valid!' : 'invalid!')
```
---

You can validate multiple addresses with the lower-level [Addresses](../api/classes/addressesservice.html) service.

--- validate address service
```ts
const [isValid1, isValid2] = await shipengine.addresses.validate([
  {
    street: '1 E 161 St',
    cityLocality: 'The Bronx',
    stateProvince: 'NY',
    postalCode: '10451',
    country: 'US'
  },
  {
    street: ['4009 Marathon Blvd', 'Suite 200'],
    cityLocality: 'The Bronx',
    stateProvince: 'TX',
    country: 'US'
  }
])

console.log(isValid1 && isValid2 ? 'all are valid' : 'some are invalid')
```
---

## Normalize an Address

When you [normalize an address](../api/classes/addressesservice.html#normalizeaddress), you are returned an [altered address](../api/classes/address.html).
You can pass an incomplete address as an argument: for example, maybe you don't know the `postalCode`.

--- normalize address args
```ts
const address = await shipengine.normalizeAddress({
    street: ['1 E 161 St'],
    cityLocality: 'The Bronx',
    stateProvince: 'NY',
    country: 'US'
})

console.log(`normalized street is: ${address.street}`)
console.log(`is residential: ${address.isResidential}`)
```
---
 [normalizeAddress](../api/classes/addressesservice.html#normalizeaddress) will throw a [ShipEngineError](../api/classes/shipengineerror.html) if the given address cannot be found or is missing too much information. You can  mport the `ShipEngineError` in order to check if the thrown are normalization errors, or if they are unexpected HTTP errors that indicate a request/response failure.

--- exception handling
```ts
try {
  await shipengine.normalizeAddress({ street: '1234 Main St' })
} catch(err) {
  if (err instanceof ShipEngineError) {
    // do something
  } else {
    console.error("some http error.", err)
  }
}
```
---

Finally, you can use the [Addresses](../api/classes/addressesservice.html) to normalize multiple addresses.
This will not throw exceptions -- rather, it will return a list of Addresses with undefined in place of any addresses that cannot be normalized.

```ts
--- normalize address service
const [addr1, addr2] = await shipengine.addresses.normalize([
    {
       street: '1234 Main St'
    },
    {
      street: ['1 E 161 St'],
      cityLocality: 'The Bronx',
      stateProvince: 'NY',
      country: 'US'
    }
  ])

console.assert(addr1 === undefined, 'first address cannot be normalized');
console.assert(!!addr2, 'second address should be valid');
```
---

## Query an Address

If you want a list of exceptions along with address normalization, you can use the [queryAddress](../api/classes/addressesservice.html#queryaddress) method.

--- query address
```ts
const addressQuery = await shipengine.queryAddress({
      street: ['1 E 161 St'],
      cityLocality: 'The Bronx',
      stateProvince: 'NY',
      postalCode: '10451',
      country: 'US'
  })

console.log(`the query result had ${addressQuery.exceptions.length} exceptions.`)
console.log(`the normalized address is: ${JSON.stringify(addressQuery.normalized)}.`)
```
---



## Programs

Swap out initialization codeblock
--- initialize --- :=
```ts
import { default as ShipEngine } from '../../src';

const shipengine = ShipEngine(process.env.API_KEY);
```
---

--- wrapper start  ---
```ts
(async () => {
```
---

--- wrapper end ---
})()
---

--- validate_address.ts
@{initialize}

@{wrapper start}

@{validate address args}

@{validate address service}

@{wrapper end}
---

--- initialize normalize
```ts
import { default as ShipEngine, ShipEngineError } from '../../src'

const shipengine = ShipEngine(process.env.API_KEY);
```
---

--- normalize_address.ts
@{initialize normalize}

@{wrapper start}

@{normalize address args}

@{exception handling}

@{normalize address service}

@{wrapper end}
---

--- query_address.ts
@{initialize}

@{wrapper start}

@{query address}

@{wrapper end}
---
