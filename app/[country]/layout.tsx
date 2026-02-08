import { notFound } from "next/navigation";
import { isValidCountrySlug } from "@/lib/country-utils";
import type { ReactNode } from "react";

interface CountryLayoutProps {
  children: ReactNode;
  params: Promise<{ country: string }>;
}

/**
 * Layout for country-specific routes
 * Validates the country slug and renders 404 if invalid
 */
export default async function CountryLayout({
  children,
  params,
}: CountryLayoutProps) {
  const { country } = await params;

  // Validate that the country slug is supported
  if (!isValidCountrySlug(country)) {
    notFound();
  }

  // Just pass through the children - the actual page content
  return <>{children}</>;
}
