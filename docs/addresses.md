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
/* import ShipEngine from 'shipengine'; */
/* warning: below is an internal import for example purposes, use module import ^ in your code */
import ShipEngine from '../../src';


const shipengine = ShipEngine('my_api_key');
---

## Validate an Address

You might want to validate that an address is correct.
The simplest way to accomplish this is by calling [validateAddress]() with the necessary information to build an [Address]().

Street is the only required field, all others are optional.


--- validate address args
```ts
shipengine.validateAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    postalCode: '10451',
    stateProvince: 'NY',
  })
  .then((isValid) => console.log(isValid ? 'valid!' : 'invalid!'));
```
---

You can validate multiple addresses with the lower-level [Addresses]() service.

--- validate address service
```ts
shipengine.addresses.validate([{
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
]).then(([isValid1, isValid2]) => {
  console.log(isValid1 && isValid2 ? 'all are valid' : 'some are invalid')
});

```
---

## Normalize an Address

When you normalize an address, you are given an altered address.
For example, maybe you don't know the `postal_code`.

--- normalize address args
```ts
shipengine.normalizeAddress({
    street: ['1 E 161 St'],
    country: 'US',
    cityLocality: 'The Bronx',
    stateProvince: 'NY'
}).then(address => {
  console.log(`normalized street is: ${address.street}`)
  console.log(`is residential: ${address.isResidential}`)
})
```
---
Normalizing an address will throw an exception if the address cannot be normalized.

In fact, all shipengine methods throw exceptions.
This is because the underlying HTTP requests may themselves cause exceptions.
To be safe, you should wrap them so that exceptions can be caught.

--- exception handling
```ts
shipengine.normalizeAddress({ street: '1234 Main St' })
  .catch(err => console.error('exception!'))
```
---

Finally, you can use the lower-level [Addresses]() to normalize multiple addresses.
This will not throw exceptions -- rather, it will return undefined anywhere there is a place where addresses will be normalized.

```ts
--- normalize address service
shipengine.addresses
  .normalize([
    { street: '1234 Main St' },
    {
      street: ['1 E 161 St'],
      country: 'US',
      cityLocality: 'The Bronx',
      stateProvince: 'NY',
    },
  ])
  .then(([addr1, addr2]) => {
    console.assert(addr1 === undefined, 'first address cannot be normalized');
    console.assert(!!addr2, 'second address should be valid');
  });

```
---

## Query an Address

Validating and normalizing an address_query uses adddress querying under-the-hood.
If you want full control over what you consider a valid address you can use the [AddressQueryResult]().

--- query address
```ts
const addressQuery = shipengine
   .queryAddress({
      street: ['1 E 161 St'],
      country: 'US',
      cityLocality: 'The Bronx',
      postalCode: '10451',
      stateProvince: 'NY',
  }).then(queryResult => {
      console.log(`the query result had ${queryResult.exceptions.length} exceptions.`)
      console.log(`the normalized address is: ${JSON.stringify(queryResult.normalized)}.`)
  })
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
