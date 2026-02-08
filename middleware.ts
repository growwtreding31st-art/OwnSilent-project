import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCountrySlug, getCountryCode, isValidCountrySlug, normalizeCountrySlug } from "./lib/country-utils";

// Extend NextRequest type to include geo property (provided by Vercel)
interface NextRequestWithGeo extends NextRequest {
  geo?: {
    city?: string;
    country?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
}

export function middleware(request: NextRequestWithGeo) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Get the country from geolocation or cookie
  const isLocalhost = request.headers.get("host")?.includes("localhost") || 
                      request.headers.get("host")?.includes("127.0.0.1");
  
  // Check for country in cookie first (for returning users)
  const cookieCountry = request.cookies.get("userCountry")?.value;
  
  // On localhost: use cookie, on production: use request.geo.country
  const countryCode = cookieCountry || (isLocalhost ? null : (request.geo?.country || null));
  const detectedCountrySlug = countryCode ? getCountrySlug(countryCode) : null;
  
  // Check if URL already has a country prefix
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  const hasCountryPrefix = firstSegment && isValidCountrySlug(firstSegment);

  // Case 1: URL has a valid country prefix
  if (hasCountryPrefix) {
    // Normalize the country slug (e.g., 'usa' -> 'america')
    const normalizedSlug = normalizeCountrySlug(firstSegment);
    
    // Set cookie to remember this country
    const urlCountryCode = getCountryCode(firstSegment);
    if (urlCountryCode) {
      // We'll apply this to the final response (rewrite or redirect)
    }
    
    // If the slug is an alias, redirect to the canonical URL
    if (normalizedSlug && normalizedSlug !== firstSegment.toLowerCase()) {
      const url = request.nextUrl.clone();
      const pathWithoutCountry = pathSegments.slice(1).join("/");
      url.pathname = `/${normalizedSlug}${pathWithoutCountry ? `/${pathWithoutCountry}` : ""}`;
      const redirectResponse = NextResponse.redirect(url, 307);
      
      if (urlCountryCode) {
        redirectResponse.cookies.set("userCountry", urlCountryCode, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
      }
      return redirectResponse;
    }
    
    // Rewrite to the actual page without the country prefix
    const pathWithoutCountry = "/" + pathSegments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutCountry || "/";
    
    // Use rewrite to serve the content without changing the URL
    const rewriteResponse = NextResponse.rewrite(url);
    
    // IMPORTANT: Attach the cookie to the rewrite response as well
    if (urlCountryCode) {
      rewriteResponse.cookies.set("userCountry", urlCountryCode, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
    }
    
    return rewriteResponse;
  }

  // Case 2: No country prefix but we detected a country - redirect to country-specific URL
  // BUT: Only redirect if we don't already have a country in the URL
  if (detectedCountrySlug && !hasCountryPrefix) {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedCountrySlug}${pathname}`;
    
    // Use 307 (Temporary Redirect) to preserve the request method
    const response = NextResponse.redirect(url, 307);
    // Set cookie to remember this country
    if (countryCode) {
      response.cookies.set("userCountry", countryCode, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
    }
    return response;
  }
  
  // Case 3: No country detected or country matches - serve current route
  // Note: We don't force redirect if user manually selected a different country
  // The cookie will be updated to their manual selection
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};


