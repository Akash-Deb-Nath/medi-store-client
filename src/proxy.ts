import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();

  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = data.user.role;

  if (pathname.startsWith("/seller")) {
    if (userRole !== Roles.seller) {
      if (userRole === Roles.admin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (userRole !== Roles.admin) {
      if (userRole === Roles.seller) {
        return NextResponse.redirect(new URL("/seller/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/seller/:path*", "/admin/:path*"],
};
