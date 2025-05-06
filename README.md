[![npm version](https://img.shields.io/npm/v/country-codes-list.svg)](https://www.npmjs.com/package/country-codes-list)
[![CI](https://github.com/YOUR_GITHUB_USERNAME/country-codes-list/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_GITHUB_USERNAME/country-codes-list/actions)

# country-codes-list

A modern, well-typed, developer-friendly TypeScript library providing a comprehensive dataset of countries and their codes (ISO 3166-1 alpha-2/alpha-3, calling codes, emoji flags, regions). Reliable, up-to-date, and MIT licensed.

## Features
- Accurate, up-to-date country data (ISO 3166-1, calling codes, emoji flags, regions)
- TypeScript-first: strong typings, strict mode
- Utility functions for easy lookups and validation
- Dual ESM/CJS support
- Zero runtime dependencies
- Thoroughly tested with Vitest

## Installation

```sh
npm install country-codes-list
```

## Usage

```ts
import { countries, countriesMap, getCountryByCode, getCallingCode, getEmojiFlag, isValidCountryCode, searchCountriesByName } from 'country-codes-list';

console.log(countries[0]);
// { name: 'Afghanistan', codeA2: 'AF', codeA3: 'AFG', callingCode: '+93', region: 'Asia', emoji: '🇦🇫' }

console.log(getCountryByCode('US'));
// { name: 'United States', codeA2: 'US', codeA3: 'USA', callingCode: '+1', region: 'Americas', emoji: '🇺🇸' }

console.log(getCallingCode('IN'));
// '+91'

console.log(getEmojiFlag('deu'));
// '🇩🇪'

console.log(isValidCountryCode('GB'));
// true

console.log(searchCountriesByName('land'));
// [ { name: 'Finland', ... }, { name: 'Iceland', ... }, ... ]
```

## CLI Usage

You can use the CLI to quickly look up country info by code:

```sh
npx country-codes-list US
# {
#   "name": "United States",
#   "codeA2": "US",
#   "codeA3": "USA",
#   "callingCode": "+1",
#   "region": "Americas",
#   "emoji": "🇺🇸"
# }
```

## API Reference

### Types

```ts
export type CountryCodeA2 = string; // e.g., 'US'
export type CountryCodeA3 = string; // e.g., 'USA'
export type CountryCallingCode = string; // e.g., '+1'

export interface Country {
  name: string;
  codeA2: CountryCodeA2;
  codeA3: CountryCodeA3;
  callingCode: CountryCallingCode;
  region: string;
  emoji: string;
}
```

### Data Exports
- `countries: Readonly<Country[]>` — All country objects
- `countriesMap: Readonly<Record<CountryCodeA2, Country>>` — Map by alpha-2 code

### Utility Functions
- `getCountryByCode(code: string): Country | undefined` — Lookup by alpha-2/alpha-3 code
- `getCallingCode(code: string): CountryCallingCode | undefined` — Get calling code
- `getEmojiFlag(code: string): string | undefined` — Get emoji flag
- `isValidCountryCode(code: string): boolean` — Validate code
- `searchCountriesByName(query: string): Country[]` — Search by name (case-insensitive substring)

All functions handle null/undefined/invalid input gracefully.

## Data Source

Country data is compiled from ISO 3166-1, ITU, Unicode CLDR, and Wikipedia. See [`src/data/countries.json`](src/data/countries.json) for the raw dataset.

## License

MIT — see [LICENSE](LICENSE)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository and create your branch from `main`.
2. Run `npm install` to install dependencies.
3. Run `npm run lint` and `npm run format:check` to ensure code style.
4. Run `npm run test` to verify all tests pass.
5. Make your changes, add tests if needed, and ensure all checks pass.
6. Submit a pull request with a clear description of your changes.

Please see the [Code of Conduct](https://opensource.guide/code-of-conduct/) and [Contributing Guide](https://opensource.guide/how-to-contribute/) for more information. 