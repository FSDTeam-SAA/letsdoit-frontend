import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PREFIXES = [
  "/profile",
  "/profile-details",
  "/inspection",
  "/report",
];

const isProtectedPath = (pathname: string) =>
  PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${req.nextUrl.pathname}${req.nextUrl.search}`
    );
    return NextResponse.redirect(loginUrl);
  }

  const role = typeof token.role === "string" ? token.role : "";

  if (role !== "INSPECTOR") {
    const homeUrl = new URL("/", req.url);
    homeUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/profile-details/:path*",
    "/inspection/:path*",
    "/report/:path*",
  ],
};
