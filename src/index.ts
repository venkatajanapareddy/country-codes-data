import countriesData from './data/countries.json';
import { Country, CountryCodeA2, CountryCodeA3, CountryCallingCode } from './types';

// Re-export core types
export * from './types';

/**
 * Immutable array of all country objects.
 */
export const countries: Readonly<Country[]> = countriesData as Country[];

/**
 * Immutable map of countries keyed by ISO 3166-1 alpha-2 code.
 */
export const countriesMap: Readonly<Record<CountryCodeA2, Country>> = Object.freeze(
  Object.fromEntries(countries.map((c) => [c.codeA2, c]))
);

/**
 * Get a country by alpha-2 or alpha-3 code (case-insensitive).
 * @param code ISO 3166-1 alpha-2 or alpha-3 code
 * @returns Country object or undefined
 */
export function getCountryByCode(code: string | null | undefined): Country | undefined {
  if (!code || typeof code !== 'string') return undefined;
  const codeNorm = code.trim().toUpperCase();
  return (
    countries.find(
      (c) => c.codeA2 === codeNorm || c.codeA3 === codeNorm
    ) || undefined
  );
}

/**
 * Get the calling code for a country by code.
 * @param code ISO 3166-1 alpha-2 or alpha-3 code
 * @returns Calling code string (e.g., '+1') or undefined
 */
export function getCallingCode(code: string | null | undefined): CountryCallingCode | undefined {
  const country = getCountryByCode(code);
  return country?.callingCode || undefined;
}

/**
 * Get the emoji flag for a country by code.
 * @param code ISO 3166-1 alpha-2 or alpha-3 code
 * @returns Emoji flag string or undefined
 */
export function getEmojiFlag(code: string | null | undefined): string | undefined {
  const country = getCountryByCode(code);
  return country?.emoji || undefined;
}

/**
 * Check if a code is a valid country code (alpha-2 or alpha-3).
 * @param code ISO 3166-1 alpha-2 or alpha-3 code
 * @returns true if valid, false otherwise
 */
export function isValidCountryCode(code: string | null | undefined): boolean {
  return !!getCountryByCode(code);
}

/**
 * Search countries by name (case-insensitive substring match).
 * @param query Name query string
 * @returns Array of matching countries
 */
export function searchCountriesByName(query: string | null | undefined): Country[] {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  return countries.filter((c) => c.name.toLowerCase().includes(q));
} 