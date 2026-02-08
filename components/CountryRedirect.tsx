"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCountrySlug, isValidCountrySlug } from "@/lib/country-utils";

/**
 * Client-side country detection and redirect.
 *
 * Logic:
 * 1. Checks if the physical location has changed since the last detection.
 * 2. If it has, updates the cookie and redirects to the new correct country.
 * 3. Uses sessionStorage to ensure we only hit the IP API once per session.
 */
export function CountryRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we've already detected location in THIS session
    const alreadyDetected = sessionStorage.getItem("sessionLocationDetected");
    if (alreadyDetected) return;

    // Detect country using IP geolocation API with fallbacks
    async function detectAndRedirect() {
      try {
        let countryCode: string | null = null;

        // Try geolocation services
        const services = [
          {
            url: "https://api.country.is/",
            extractCountry: (data: any) => data.country,
          },
          {
            url: "https://ipapi.co/json/",
            extractCountry: (data: any) => data.country_code,
          },
        ];

        for (const service of services) {
          try {
            console.log(`Verifying location: ${service.url}`);
            const response = await fetch(service.url, {
              signal: AbortSignal.timeout(5000),
            });
            if (response.ok) {
              const data = await response.json();
              countryCode = service.extractCountry(data);
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (countryCode) {
          const countrySlug = getCountrySlug(countryCode);

          // Mark session as detected so we don't hit API again unnecessarily
          sessionStorage.setItem("sessionLocationDetected", "true");

          if (countrySlug) {
            // Check current URL prefix
            const segments = pathname.split("/").filter(Boolean);
            const currentPrefix = segments[0];

            // If the URL has NO country, OR the country is DIFFERENT than reality:
            if (
              !isValidCountrySlug(currentPrefix) ||
              currentPrefix !== countrySlug
            ) {
              console.log(
                `Location mismatch! Reality: ${countrySlug}, URL: ${currentPrefix || "none"}. Redirecting...`,
              );

              // Update cookie and redirect
              document.cookie = `userCountry=${countryCode}; path=/; max-age=${60 * 60 * 24 * 30}`;

              const pathWithoutCountry = isValidCountrySlug(currentPrefix)
                ? "/" + segments.slice(1).join("/")
                : pathname;

              const newPath = `/${countrySlug}${pathWithoutCountry === "/" ? "" : pathWithoutCountry}`;
              router.replace(newPath);
            }
          }
        }
      } catch (error) {
        console.error("Geolocation check failed:", error);
      }
    }

    detectAndRedirect();
  }, [pathname, router]);

  return null;
}
