"use client";

import { useCountry } from "@/hooks/useCountry";
import { CountryLink } from "./CountryLink";

/**
 * Example component showing how to use country-based routing
 *
 * You can add this to any page to see the current country information
 */
export function CountryInfo() {
  const { countrySlug, countryCode, hasCountryPrefix, basePath } = useCountry();

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg max-w-xs z-50">
      <h3 className="font-bold text-sm mb-2">🌍 Country Routing Info</h3>

      <div className="space-y-1 text-xs">
        <p>
          <strong>Country:</strong>{" "}
          {hasCountryPrefix ? (
            <span className="text-blue-600">
              {countrySlug} ({countryCode})
            </span>
          ) : (
            <span className="text-gray-500">Default (No country)</span>
          )}
        </p>

        <p>
          <strong>Base Path:</strong>{" "}
          <code className="bg-gray-100 px-1 rounded">{basePath || "/"}</code>
        </p>

        <p>
          <strong>Has Prefix:</strong>{" "}
          <span
            className={hasCountryPrefix ? "text-green-600" : "text-gray-500"}
          >
            {hasCountryPrefix ? "Yes" : "No"}
          </span>
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs font-semibold mb-2">Test Links:</p>
        <div className="flex flex-col gap-1">
          <CountryLink
            href="/about-us"
            className="text-xs text-blue-600 hover:underline"
          >
            → About Us (with country)
          </CountryLink>
          <CountryLink
            href="/admin"
            absolute
            className="text-xs text-purple-600 hover:underline"
          >
            → Admin (absolute)
          </CountryLink>
        </div>
      </div>
    </div>
  );
}
