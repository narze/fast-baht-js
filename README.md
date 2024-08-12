# Baht.js

<span class="badge-npmversion"><a href="https://npmjs.org/package/baht" title="View this project on NPM"><img src="https://img.shields.io/npm/v/baht.svg" alt="NPM version" /></a></span> <!-- <span class="badge-npmdownloads"><a href="https://npmjs.org/package/baht" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/baht.svg" alt="NPM downloads" /></a></span> --> [![install size](https://packagephobia.com/badge?p=baht)](https://packagephobia.com/result?p=baht)

Convert number to Thai Baht format, but faster & fully typed.

## Demo

- https://baht-js.vercel.app

## Usage

- Install with npm or yarn

  ```shell
  npm install baht
  # or
  yarn add baht
  ```

- Import and use

  ```javascript
  import { convert } from 'baht';

  convert(42); // "สี่สิบสองบาทถ้วน"
  convert(123.45); // "หนึ่งร้อยยี่สิบสามบาทสี่สิบห้าสตางค์"
  ```

## Features

- Converts number to Thai Baht formatted string.
- Converts long number (Use string format to prevent precision loss.)
- Supports 2 decimal places (Satangs), for over 2 decimal places it will round down.
- Supports negative number.

## Benchmark

Run the benchmark to measure the speed among other libraries.

- Apple Macbook M1 Pro (Node v22.6.0)

  ```shell
  yarn benchmark

  baht (x100000): 364ms
  thai-baht-lib (code improved from baht.js) (x100000): 359ms
  bahttext (x100000): 2791ms
  BAHTTEXT.js (x100000): 2417ms
  thai-baht-text (x100000): 5010ms
  thai-baht-text-ts (x100000): 4465ms
  BahtRext (x100000): 6131ms
  ```

- Apple Macbook M1 Pro (Bun v1.1.22)

  ```shell
  bun ./benchmark

  baht (x100000): 336ms
  thai-baht-lib (code improved from baht.js) (x100000): 329ms
  bahttext (x100000): 3574ms
  BAHTTEXT.js (x100000): 2799ms
  thai-baht-text (x100000): 6163ms
  thai-baht-text-ts (x100000): 5143ms
  BahtRext (x100000): 7085ms
  ```

- Apple Macbook Pro (Intel) with Node v14.16.0

  ```shell
  yarn benchmark

  baht (x100000): 648ms
  bahtLatest (x100000): 1393ms
  thaiBahtLib (x100000): 5855ms
  bahttext (x100000): 5664ms
  BAHTTEXT.js (x100000): 8145ms
  thai-baht-text (x100000): 15730ms
  thai-baht-text-ts (x100000): 15734ms
  ```

- Apple Macbook Pro 16-inch (i7, 16GB) with Node v16.12.0

  ```shell
  yarn benchmark

  baht (x100000): 484ms
  bahtLatest (x100000): 1044ms
  thaiBahtLib (x100000): 4753ms
  bahttext (x100000): 5120ms
  BAHTTEXT.js (x100000): 7427ms
  thai-baht-text (x100000): 13208ms
  thai-baht-text-ts (x100000): 12344ms
  ```

- Intel(R) Xeon(R) Platinum 8259CL CPU @2.50GHz (64-bit) with Node v14.16.1

  ```shell
  yarn benchmark

  baht (x100000): 684ms
  bahtLatest (x100000): 1589ms
  thaiBahtLib (x100000): 7366ms
  bahttext (x100000): 7166ms
  BAHTTEXT.js (x100000): 11513ms
  thai-baht-text (x100000): 19315ms
  thai-baht-text-ts (x100000): 17400ms
  ```

Baht.js is the fastest!

## LICENSE

MIT
