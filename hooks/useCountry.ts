"use client";

import { usePathname } from "next/navigation";
import { isValidCountrySlug, getCountryCode, type CountrySlug } from "@/lib/country-utils";

export interface UseCountryReturn {
  /** Current country slug from URL (e.g., 'america', 'india') or null if default route */
  countrySlug: CountrySlug | null;
  /** Current country code (e.g., 'US', 'IN') or null if default route */
  countryCode: string | null;
  /** Whether the current route has a country prefix */
  hasCountryPrefix: boolean;
  /** The base pathname without country prefix */
  basePath: string;
}

/**
 * Hook to get the current country from the URL
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { countrySlug, countryCode, hasCountryPrefix } = useCountry();
 *   
 *   return (
 *     <div>
 *       {hasCountryPrefix ? (
 *         <p>Viewing from: {countrySlug} ({countryCode})</p>
 *       ) : (
 *         <p>Viewing default site</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCountry(): UseCountryReturn {
  const pathname = usePathname();
  
  // Parse the pathname to extract country
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  
  // Check if first segment is a valid country
  const hasCountryPrefix = firstSegment ? isValidCountrySlug(firstSegment) : false;
  const countrySlug = hasCountryPrefix ? (firstSegment as CountrySlug) : null;
  const countryCode = countrySlug ? getCountryCode(countrySlug) : null;
  
  // Get base path without country prefix
  const basePath = hasCountryPrefix 
    ? "/" + segments.slice(1).join("/")
    : pathname;
  
  return {
    countrySlug,
    countryCode,
    hasCountryPrefix,
    basePath,
  };
}
