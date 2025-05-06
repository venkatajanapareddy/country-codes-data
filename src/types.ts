/**
 * ISO 3166-1 alpha-2 country code (e.g., 'US')
 */
export type CountryCodeA2 = string;

/**
 * ISO 3166-1 alpha-3 country code (e.g., 'USA')
 */
export type CountryCodeA3 = string;

/**
 * Country calling code (e.g., '+1')
 */
export type CountryCallingCode = string;

/**
 * Country data structure
 */
export interface Country {
  /** Common English name (e.g., 'United States') */
  name: string;
  /** ISO 3166-1 alpha-2 code (e.g., 'US') */
  codeA2: CountryCodeA2;
  /** ISO 3166-1 alpha-3 code (e.g., 'USA') */
  codeA3: CountryCodeA3;
  /** Primary country calling code, including '+' (e.g., '+1') */
  callingCode: CountryCallingCode;
  /** Geographic region/continent (e.g., 'Americas') */
  region: string;
  /** Unicode flag emoji (e.g., '🇺🇸') */
  emoji: string;
} 