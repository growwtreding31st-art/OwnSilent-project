"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { isValidCountrySlug } from "@/lib/country-utils";
import type { ComponentProps } from "react";

type NextLinkProps = ComponentProps<typeof NextLink>;

interface CountryLinkProps extends Omit<NextLinkProps, "href"> {
  /** The href path (will automatically include country prefix if needed) */
  href: string;
  /** Force absolute path without country prefix */
  absolute?: boolean;
}

/**
 * Link component that automatically handles country prefixes
 *
 * This component preserves the country prefix from the current URL
 * when navigating to other pages.
 *
 * @example
 * ```tsx
 * // If user is on /india/shop, this will link to /india/about-us
 * <CountryLink href="/about-us">About Us</CountryLink>
 *
 * // Force absolute path (no country prefix)
 * <CountryLink href="/admin" absolute>Admin</CountryLink>
 * ```
 */
export function CountryLink({
  href,
  absolute = false,
  ...props
}: CountryLinkProps) {
  const pathname = usePathname();

  // Extract current country from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  const currentCountry =
    firstSegment && isValidCountrySlug(firstSegment) ? firstSegment : null;

  // Build the final href
  let finalHref = href;

  // Only add country prefix if:
  // 1. Not forcing absolute path
  // 2. We have a current country
  // 3. The href doesn't already start with the country
  // 4. The href is a relative path (starts with /)
  if (!absolute && currentCountry && href.startsWith("/")) {
    const hrefSegments = href.split("/").filter(Boolean);
    const hrefFirstSegment = hrefSegments[0];

    // Don't add country if href already has a country prefix
    if (
      hrefFirstSegment !== currentCountry &&
      !isValidCountrySlug(hrefFirstSegment)
    ) {
      finalHref = `/${currentCountry}${href}`;
    }
  }

  return <NextLink href={finalHref} {...props} />;
}

// Export as default for easier replacement
export default CountryLink;
