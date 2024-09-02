import { assertEquals } from 'jsr:@std/assert@1';

import Baht from '../src/index.ts';

function assertBaht(value: number, expected: string) {
  console.log(`${value} -> ${Baht(value)} (Expected: ${expected})`);
  assertEquals(Baht(value), expected);
}

Deno.test('Baht.js works on Deno', () => {
  assertBaht(123, 'หนึ่งร้อยยี่สิบสามบาทถ้วน');
  assertBaht(123.45, 'หนึ่งร้อยยี่สิบสามบาทสี่สิบห้าสตางค์');
});
