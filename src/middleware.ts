import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isBlogHost(host: string): boolean {
  const hostname = host.split(":")[0];
  if (hostname === "blog.sogenenergy.co.nz") return true;
  if (
    process.env.NODE_ENV === "development" &&
    (process.env.NEXT_PUBLIC_BLOG_HOST_DEV === "true" ||
      process.env.VITE_BLOG_HOST_DEV === "true")
  ) {
    return true;
  }
  return false;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (isBlogHost(host)) {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/blog-host")) {
      url.pathname = `/blog-host${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
