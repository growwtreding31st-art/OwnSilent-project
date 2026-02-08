"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
            const response = await fetch(service.url, {
              signal: AbortSignal.timeout(5000),
            });
            if (response.ok) {
              const data = await response.json();
              countryCode = service.extractCountry(data);
              if (countryCode) break;
            } else {
              console.warn(
                `Geolocation service failed: ${service.url} - ${response.status}`,
              );
            }
          } catch (err) {
            console.warn(`Geolocation service error: ${service.url}`, err);
            continue;
          }
        }

        if (countryCode) {
          const countrySlug = getCountrySlug(countryCode);

          // Mark session as detected so we don't hit API again unnecessarily
          sessionStorage.setItem("sessionLocationDetected", "true");

          if (countrySlug) {
            // Also update localStorage for the blocking script (country-redirect.js)
            localStorage.setItem("detectedCountry", countrySlug);

            // Check current URL prefix
            const segments = pathname.split("/").filter(Boolean);
            const currentPrefix = segments[0];

            // If the URL has NO country, OR the country is DIFFERENT than reality:
            // isValidCountrySlug(currentPrefix) handles undefined safely now.
            if (
              !isValidCountrySlug(currentPrefix) ||
              currentPrefix !== countrySlug
            ) {
              console.log(
                `Location mismatch! Reality: ${countrySlug}, URL: ${currentPrefix || "none"}. Redirecting...`,
              );

              // Update cookie
              document.cookie = `userCountry=${countryCode}; path=/; max-age=${60 * 60 * 24 * 30}`;

              const pathWithoutCountry = isValidCountrySlug(currentPrefix)
                ? "/" + segments.slice(1).join("/")
                : pathname;

              const newPath = `/${countrySlug}${pathWithoutCountry === "/" ? "" : pathWithoutCountry}`;

              // Use window.location.replace for a hard redirect to ensure middleware and all state is consistent
              window.location.replace(newPath);
            }
          }
        } else {
          console.warn("Could not detect country from any service.");
        }
      } catch (error) {
        console.error("Geolocation check failed:", error);
      }
    }

    detectAndRedirect();
  }, [pathname]);

  return null;
}
