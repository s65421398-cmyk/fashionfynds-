import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check for better-auth session cookie (manual check due to Next.js 15 Edge Runtime issues)
  const hasSession = request.cookies.has("better-auth.session_token");
  
  // Redirect to login if no session cookie found
  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path*", "/admin", "/admin/:path*"],
};