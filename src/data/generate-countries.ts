#!/usr/bin/env tsx
// Script to generate src/data/countries.json from world-countries. Run manually when updating data.
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import worldCountries from 'world-countries';

interface CountryJson {
  name: string;
  codeA2: string;
  codeA3: string;
  callingCode: string;
  region: string;
  emoji: string;
}

// Type for International Direct Dialing (IDD) data
interface IDD {
  root?: string;
  suffixes?: string[];
}

// Type for the world-countries entry
interface WorldCountry {
  name: {
    common: string;
    [key: string]: unknown;
  };
  cca2: string;
  cca3: string;
  idd: IDD;
  region: string;
  flag: string;
  [key: string]: unknown;
}

function getPrimaryCallingCode(idd: IDD): string {
  if (!idd || !idd.root) return '';
  // For NANP countries (idd.root === '+1'), use '+1' as the calling code
  if (idd.root === '+1') return '+1';
  if (!idd.suffixes || !Array.isArray(idd.suffixes) || idd.suffixes.length === 0) return idd.root;
  return idd.root + idd.suffixes[0];
}

const countries: CountryJson[] = (worldCountries as unknown as WorldCountry[]).map(c => ({
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
