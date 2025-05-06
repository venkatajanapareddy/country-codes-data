#!/usr/bin/env tsx
// Script to generate src/data/countries.json from world-countries. Run manually when updating data.
import worldCountries from 'world-countries';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

interface CountryJson {
  name: string;
  codeA2: string;
  codeA3: string;
  callingCode: string;
  region: string;
  emoji: string;
}

function getPrimaryCallingCode(idd: any): string {
  if (!idd || !idd.root) return '';
  // For NANP countries (idd.root === '+1'), use '+1' as the calling code
  if (idd.root === '+1') return '+1';
  if (!idd.suffixes || !Array.isArray(idd.suffixes) || idd.suffixes.length === 0) return idd.root;
  return idd.root + idd.suffixes[0];
}

const countries: CountryJson[] = worldCountries.map((c: any) => ({
  name: c.name.common,
  codeA2: c.cca2,
  codeA3: c.cca3,
  callingCode: getPrimaryCallingCode(c.idd),
  region: c.region,
  emoji: c.flag,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outPath = join(__dirname, 'countries.json');
writeFileSync(outPath, JSON.stringify(countries, null, 2));
console.log(`Wrote ${countries.length} countries to ${outPath}`); 