import {
  countries,
  countriesMap,
  getCountryByCode,
  getCallingCode,
  getEmojiFlag,
  isValidCountryCode,
  searchCountriesByName,
} from '../src';
import { describe, it, expect } from 'vitest';

// Sample codes for testing
const US = {
  a2: 'US',
  a3: 'USA',
  name: 'United States',
  calling: '+1',
  emoji: '🇺🇸',
  region: 'Americas',
};
const IN = { a2: 'IN', a3: 'IND', name: 'India', calling: '+91', emoji: '🇮🇳', region: 'Asia' };
const DE = { a2: 'DE', a3: 'DEU', name: 'Germany', calling: '+49', emoji: '🇩🇪', region: 'Europe' };

describe('countries dataset', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });

  it('should have all required fields for a sample country', () => {
    const us = countries.find(c => c.codeA2 === US.a2);
    expect(us).toBeDefined();
    expect(us?.name).toBe(US.name);
    expect(us?.codeA2).toBe(US.a2);
    expect(us?.codeA3).toBe(US.a3);
    expect(us?.callingCode).toBe(US.calling);
    expect(us?.region).toBe(US.region);
    expect(us?.emoji).toBe(US.emoji);
  });
});

describe('countriesMap', () => {
  it('should map alpha-2 codes to country objects', () => {
    expect(countriesMap[US.a2]).toBeDefined();
    expect(countriesMap[US.a2].name).toBe(US.name);
  });
  it('should be immutable', () => {
    expect(Object.isFrozen(countriesMap)).toBe(true);
  });
});

describe('getCountryByCode', () => {
  it('should find by alpha-2 code (case-insensitive)', () => {
    expect(getCountryByCode('us')?.name).toBe(US.name);
    expect(getCountryByCode('UsA')?.name).toBe(US.name);
    expect(getCountryByCode('IN')?.name).toBe(IN.name);
  });
  it('should find by alpha-3 code (case-insensitive)', () => {
    expect(getCountryByCode('usa')?.name).toBe(US.name);
    expect(getCountryByCode('ind')?.name).toBe(IN.name);
  });
  it('should return undefined for invalid codes', () => {
    expect(getCountryByCode('ZZ')).toBeUndefined();
    expect(getCountryByCode('')).toBeUndefined();
    expect(getCountryByCode(null as any)).toBeUndefined();
    expect(getCountryByCode(undefined as any)).toBeUndefined();
    expect(getCountryByCode(123 as any)).toBeUndefined();
  });
});

describe('getCallingCode', () => {
  it('should return the correct calling code', () => {
    expect(getCallingCode('US')).toBe(US.calling);
    expect(getCallingCode('usa')).toBe(US.calling);
    expect(getCallingCode('IN')).toBe(IN.calling);
    expect(getCallingCode('ind')).toBe(IN.calling);
  });
  it('should return undefined for invalid codes', () => {
    expect(getCallingCode('ZZ')).toBeUndefined();
    expect(getCallingCode('')).toBeUndefined();
    expect(getCallingCode(null as any)).toBeUndefined();
  });
});

describe('getEmojiFlag', () => {
  it('should return the correct emoji flag', () => {
    expect(getEmojiFlag('US')).toBe(US.emoji);
    expect(getEmojiFlag('usa')).toBe(US.emoji);
    expect(getEmojiFlag('IN')).toBe(IN.emoji);
    expect(getEmojiFlag('ind')).toBe(IN.emoji);
    expect(getEmojiFlag('de')).toBe(DE.emoji);
    expect(getEmojiFlag('deu')).toBe(DE.emoji);
  });
  it('should return undefined for invalid codes', () => {
    expect(getEmojiFlag('ZZ')).toBeUndefined();
    expect(getEmojiFlag('')).toBeUndefined();
    expect(getEmojiFlag(null as any)).toBeUndefined();
  });
});

describe('isValidCountryCode', () => {
  it('should return true for valid codes', () => {
    expect(isValidCountryCode('US')).toBe(true);
    expect(isValidCountryCode('usa')).toBe(true);
    expect(isValidCountryCode('IN')).toBe(true);
    expect(isValidCountryCode('ind')).toBe(true);
  });
  it('should return false for invalid codes', () => {
    expect(isValidCountryCode('ZZ')).toBe(false);
    expect(isValidCountryCode('')).toBe(false);
    expect(isValidCountryCode(null as any)).toBe(false);
    expect(isValidCountryCode(undefined as any)).toBe(false);
  });
});

describe('searchCountriesByName', () => {
  it('should find countries by substring (case-insensitive)', () => {
    const results = searchCountriesByName('land');
    expect(results.some(c => c.name === 'Finland')).toBe(true);
    expect(results.some(c => c.name === 'Iceland')).toBe(true);
    expect(results.some(c => c.name === 'Switzerland')).toBe(true);
  });
  it('should return empty array for no match or invalid input', () => {
    expect(searchCountriesByName('zzzzzz')).toEqual([]);
    expect(searchCountriesByName('')).toEqual([]);
    expect(searchCountriesByName(null as any)).toEqual([]);
    expect(searchCountriesByName(undefined as any)).toEqual([]);
  });
});

describe('Data Edge Cases', () => {
  it('should handle Antarctica (AQ) correctly', () => {
    const antarctica = getCountryByCode('AQ');
    expect(antarctica).toBeDefined();
    expect(antarctica?.name).toBe('Antarctica');
    expect(antarctica?.callingCode).toBe(''); // Data has empty string
    expect(getCallingCode('AQ')).toBeUndefined(); // Utility returns undefined for empty string
    expect(getEmojiFlag('AQ')).toBe('🇦🇶');
    expect(isValidCountryCode('AQ')).toBe(true);
  });

  it('should handle countries with potentially empty emoji flags (e.g., BQ - Caribbean Netherlands)', () => {
    const bq = getCountryByCode('BQ');
    expect(bq).toBeDefined();
    expect(bq?.emoji).toBe(''); // Data has empty string
    expect(getEmojiFlag('BQ')).toBeUndefined(); // Utility returns undefined for empty string
    expect(isValidCountryCode('BQ')).toBe(true);
  });
});
