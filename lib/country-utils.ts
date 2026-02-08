// Country detection and mapping utilities

export const SUPPORTED_COUNTRIES = {
  US: 'america',
  IN: 'india',
  AE: 'uae',
  GB: 'uk',
  AU: 'australia',
  DE: 'germany',
  FR: 'france',
  CA: 'canada',
  RU: 'russia',
  CN: 'china',
  JP: 'japan',
  BR: 'brazil',
  IT: 'italy',
  ES: 'spain',
  MX: 'mexico',
  KR: 'south-korea',
  NL: 'netherlands',
  SE: 'sweden',
  CH: 'switzerland',
  SG: 'singapore',
  // Add more countries as needed
} as const;

// Country slug aliases - alternative URLs that map to the same country
// We automatically include 2-letter country codes as aliases
export const COUNTRY_ALIASES: Record<string, keyof typeof SUPPORTED_COUNTRIES> = {
  'usa': 'US',
  'united-states': 'US',
  'united-kingdom': 'GB',
  'britain': 'GB',
  // Add 2-letter codes automatically
  ...Object.keys(SUPPORTED_COUNTRIES).reduce((acc, code) => ({
    ...acc,
    [code.toLowerCase()]: code as keyof typeof SUPPORTED_COUNTRIES
  }), {})
};

export type CountryCode = keyof typeof SUPPORTED_COUNTRIES;
export type CountrySlug = typeof SUPPORTED_COUNTRIES[CountryCode];

/**
 * Convert country code (e.g., 'US') to URL slug (e.g., 'america')
 */
export function getCountrySlug(countryCode: string): CountrySlug | null {
  const code = countryCode.toUpperCase() as CountryCode;
  return SUPPORTED_COUNTRIES[code] || null;
}

/**
 * Convert URL slug (e.g., 'america') to country code (e.g., 'US')
 * Also handles aliases like 'usa' -> 'US'
 */
export function getCountryCode(slug: string): CountryCode | null {
  const lowerSlug = slug.toLowerCase();
  
  // Check if it's an alias first
  if (COUNTRY_ALIASES[lowerSlug]) {
    return COUNTRY_ALIASES[lowerSlug];
  }
  
  // Otherwise, look up in the main mapping
  const entry = Object.entries(SUPPORTED_COUNTRIES).find(
    ([_, value]) => value === lowerSlug
  );
  return entry ? (entry[0] as CountryCode) : null;
}

/**
 * Check if a slug is a valid country slug (including aliases)
 */
export function isValidCountrySlug(slug: string | null | undefined): slug is CountrySlug {
  console.log(slug)
  if (!slug) return false;
  const lowerSlug = slug.toLowerCase();
  
  // Check if it's a direct match
  if (Object.values(SUPPORTED_COUNTRIES).includes(lowerSlug as CountrySlug)) {
    return true;
  }
  
  // Check if it's an alias
  return lowerSlug in COUNTRY_ALIASES;
}

/**
 * Get all supported country slugs
 */
export function getAllCountrySlugs(): CountrySlug[] {
  return Object.values(SUPPORTED_COUNTRIES);
}

/**
 * Normalize a country slug to the canonical form
 * e.g., 'usa' -> 'america', 'us' -> 'america'
 */
export function normalizeCountrySlug(slug: string): CountrySlug | null {
  const lowerSlug = slug.toLowerCase();
  
  // Check if it's already a valid slug
  if (Object.values(SUPPORTED_COUNTRIES).includes(lowerSlug as CountrySlug)) {
    return lowerSlug as CountrySlug;
  }
  
  // Check if it's an alias
  if (COUNTRY_ALIASES[lowerSlug]) {
    const countryCode = COUNTRY_ALIASES[lowerSlug];
    return SUPPORTED_COUNTRIES[countryCode];
  }
  
  return null;
}
