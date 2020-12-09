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
import ShipEngine from 'shipengine';


const shipengine = ShipEngine('my_api_key');
```
---

## Validate an Address

You might want to validate that an address is correct.
The simplest way to accomplish this is by calling [validateAddress]() with the necessary information to build an [Address]().

--- validate address args
```ts

const isValid = await shipengine.validateAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
  })

console.log(isValid ? 'valid!' : 'invalid!')
```
---

You can validate multiple addresses with the lower-level [Addresses]() service.

--- validate address service
```ts
const [isValid1, isValid2] = shipengine.addresses.validate([{
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
  },
  {
    street: ['4009 Marathon Blvd', 'Suite 200'],
    country: 'US',
    cityLocality: 'The Bronx',
    stateProvince: 'TX'
  }
])

console.log(isValid1 && isValid2 ? 'all are valid' : 'some are invalid')
```
---

## Normalize an Address

When you normalize an address, you are given an altered address.
For example, maybe you don't know the `postalCode`.

Street can be a string or an array of strings.

--- normalize address args
```ts
const address = await shipengine.normalizeAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    stateProvince: 'NY'
})

console.log(`normalized street is: ${address.street}`)
console.log(`is residential: ${address.isResidential}`)
```
---
Normalizing an address will throw an exception if the address cannot be normalized.

In fact, all shipengine methods throw exceptions.

This is because the underlying HTTP requests may themselves cause exceptions.

To be safe, you should catch them.

--- exception handling
```ts
try {
  await shipengine.normalizeAddress({ street: '1234 Main St' })
} catch(err) {
  // do something with error
  console.error('caught!')
}
```
---

Finally, you can use the lower-level [Addresses]() to normalize multiple addresses.
This will not throw exceptions -- rather, it will return a list of Addresses with undefined in place of any addresses that cannot be normalized.

```ts
--- normalize address service
const [addr1, addr2] = await shipengine.addresses.normalize([
    {
       street: '1234 Main St'
    },
    {
      street: ['1 E 161 St'],
      country: 'US',
      cityLocality: 'The Bronx',
      stateProvince: 'NY'
    }
  ])

console.assert(addr1 === undefined, 'first address cannot be normalized');
console.assert(!!addr2, 'second address should be valid');
```
---

## Query an Address

If you want a list of exceptions along with address normalization, you can use the `queryAddress` method.

--- query address
```ts
const addressQuery = await shipengine.queryAddress({
      street: ['1 E 161 St'],
      country: 'US',
      cityLocality: 'The Bronx',
      postalCode: '10451',
      stateProvince: 'NY',
  })

console.log(`the query result had ${addressQuery.exceptions.length} exceptions.`)
console.log(`the normalized address is: ${JSON.stringify(addressQuery.normalized)}.`)
```
---

## Programs

--- validate_address.ts
@{initialize}

@{validate address args}

@{validate address service}
---

--- normalize_address.ts
@{initialize}

@{normalize address args}

@{exception handling}

@{normalize address service}
---

--- query_address.ts
@{initialize}

@{query address}
---
