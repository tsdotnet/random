<a name="banner"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/random@master/assets/banner.svg" alt="@tsdotnet/random: Pick, mix and roll. Random numbers, picks and shuffles."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/random.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/random)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/random/blob/master/LICENSE)

Random numbers, integers in ranges, random picks and shuffles.

## Install

```sh
npm install @tsdotnet/random
```

## Usage

```ts
import random from '@tsdotnet/random';

const deck = [1, 2, 3, 4, 5];
random.integer(6);             // 0 to 5
random.next.inRange(10, 20);   // 10 to 19
random.select.one(deck);       // one random entry
random.shuffleCopy(deck);      // a new shuffled array
random.shuffle(deck);          // shuffles in place
```

`random.integers(count, boundary)` returns an array of random integers; `random.select(source, n)` picks `n` entries.

## Use it from

ESM (`import random from '@tsdotnet/random';`) or CommonJS (`const random = require('@tsdotnet/random').default;`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-init@1/dist/umd/array-init.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-copy@1/dist/umd/array-copy.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/integer@1/dist/umd/integer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/random@1/dist/umd/random.min.js"></script>
<script>
  const random = tsdotnet.random.default;
</script>
```

</details>

## Docs

[tsdotnet.github.io/random](https://tsdotnet.github.io/random/)
