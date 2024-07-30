import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   const currentUser = request.cookies.get("currentUser")?.value;

  //   if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
  //     return Response.redirect(new URL("/dashboard", request.url));
  //   }

  //   if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
  //     return Response.redirect(new URL("/login", request.url));
  //   }

  if (request.nextUrl.pathname.endsWith("/login")) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
