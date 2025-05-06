#!/usr/bin/env node
import { getCountryByCode } from './index';

const code = process.argv[2];
if (!code) {
  console.error('Usage: npx country-codes [CODE] or npx countrycodes [CODE]');
  process.exit(1);
}
const country = getCountryByCode(code);
if (!country) {
  console.error('Country not found for code:', code);
  process.exit(2);
}
console.log(JSON.stringify(country, null, 2));
