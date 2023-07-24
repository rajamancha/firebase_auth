import { COOKIE_NAME } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

const guestRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (
    new RegExp(/^\/api|.*(fonts|_next|vk.com|favicon).*$/).test(request.url)
  ) {
    return NextResponse.next();
  }
  if (token) {
    if (guestRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (!guestRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
