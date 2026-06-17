import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // 1. Exclude static assets, system internal assets, and API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/static") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Extract subdomain cleanly by splitting the host by dots
  const hostnameParts = hostname.split(".");

  let currentHost = "";
  if (hostnameParts.length > 1) {
    currentHost = hostnameParts[0];
  }

  // 3. Ensure we ignore standard root traffic domains
  if (
    currentHost &&
    currentHost !== "www" &&
    currentHost !== "localhost" &&
    currentHost !== "clearrack"
  ) {
    console.log(
      `🚀 [Proxy API Router] Intercepting traffic for tenant slug: ${currentHost}`,
    );

    // Updated to point to the public 'storefront' directory
    url.pathname = `/storefront/${currentHost}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Updated matcher to exclude the storefront dynamic path from internal blocking
    "/((?!api|_next/static|_next/image|favicon.ico|storefront).*)",
  ],
};
