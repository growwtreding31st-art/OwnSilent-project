import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ✅ 1. LOCAL / DEV ENV → SKIP MIDDLEWARE
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const host = request.headers.get("host") || "";

  // ✅ Extra safety (optional)
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return NextResponse.next();
  }

  const country = (request.geo?.country ?? "IN") as string;
  const url = request.nextUrl.clone();

  const domainMap: Record<string, string> = {
    // IN: "ownsilent.in",
    // AE: "ownsilent.ae",
    // UK: "ownsilent.uk",
    // US: "ownsilent.us",
    // AU: "ownsilentau.com",
    // DE: "ownsilent.eu",
    // FR: "ownsilent.eu",
    IN: "ownsilent.international",
    AE: "ownsilent.international",
    UK: "ownsilent.international",
    US: "ownsilent.international",
    AU: "ownsilent.international",
    DE: "ownsilent.international",
    FR: "ownsilent.international",
  };

  const targetDomain = domainMap[country] ?? "ownsilent.international";

  const cleanHost = host.replace(/^www\./, "");

  // ✅ Already correct domain → no redirect
  if (cleanHost === targetDomain) {
    return NextResponse.next();
  }

  url.hostname = targetDomain;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};
