@code_type typescript .ts
@comment_type /* %s */
@add_css css/normalize.css
@add_css css/fonts.css
@add_css css/milligram.css
@add_css css/main.css

# Errors

## Introduction
When you make a request with a method such as `createTag`, this library doesn't throw errors. Instead, it returns a response with either `type: success` or `type: error`.

Data types like this, which can be represented by multiple shapes (e.g. `Foo | Bar`) but are discriminated by a single key such as `type`, are known as [discriminating unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions). Discriminating unions also commonly known as [tagged unions](https://en.wikipedia.org/wiki/Tagged_union), and therefore you will sometimes see the discriminant key called `tag` instead of `type`.

This response structure is inspired by the FP concept of an [Either](https://gigobyte.github.io/purify/adts/Either).

--- example
```ts
// success response
{
  type: 'success',
  result: {
    name: 'SOME_TAG',
  },
  id: 'abc123',
}

// error response
{
  type: 'error',
  error: {
     message: 'Invalid Request',
     data: {
       required: ['name'],
     },
  },
  id: null,
}
```
---

--- either
```ts
const response = await shipengine.createTag("MY_TAG")
if (response.type === 'success') {
  console.log('Tag created!', response.result)
} else {
  console.error('error', response.error)
}

console.assert(response.type !== 'error', 'Tag should be successful');
```
---

## Programs

Swap out initialization codeblock
--- initialize ---
```ts
import { default as ShipEngine } from '../../src';

import 'dotenv/config';
const shipengine = new ShipEngine(process.env.API_KEY);
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

--- create-tags.ts
@{initialize}

@{wrapper start}

@{either}

@{wrapper end}
---

