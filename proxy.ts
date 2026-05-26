import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 requires the function export name to be exactly "proxy"
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. Completely isolate internal assets from matching processes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Platform Anchor Identification Keys
  const rootDomains = [
    "localhost:3000",
    "clearrackapp.com",
    "admin.clearrackapp.com",
  ];

  if (rootDomains.includes(hostname)) {
    return NextResponse.next();
  }

  // 3. Extract the store account slug handle
  const currentStoreSlug = hostname
    .replace(".localhost:3000", "")
    .replace(".clearrackapp.com", "");

  // 4. Safe Rewrite Action to our catch-all multi-tenant folder layout
  return NextResponse.rewrite(
    new URL(`/stores/${currentStoreSlug}${url.pathname}${url.search}`, req.url),
  );
}
