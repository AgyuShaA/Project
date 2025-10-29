import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/pkg/libraries/locale/routing";

const authRoutes = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const i18nRes = createMiddleware(routing)(req);
  const DEFAULT_LOCALE = "en"; // or your main locale

  const segments = req.nextUrl.pathname.split("/").filter(Boolean);
  const predefinedLocale = segments[0] || DEFAULT_LOCALE;
  const pathWithoutLocale =
    segments.length > 1
      ? "/" + segments.slice(1).join("/")
      : "/" + segments[0] || "/";

  const session = getSessionCookie(req);
  const isAuthRoute = authRoutes.includes(pathWithoutLocale);

  console.log({
    segments,
    predefinedLocale,
    pathWithoutLocale,
    isAuthRoute,
    session,
  });

  if (!session) {
    if (isAuthRoute) return i18nRes;

    return NextResponse.redirect(
      new URL(`/${predefinedLocale}/login`, req.url),
      { headers: i18nRes.headers }
    );
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL(`/${predefinedLocale}/`, req.url), {
      headers: i18nRes.headers,
    });
  }

  return i18nRes;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|admin|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)",
  ],
};
