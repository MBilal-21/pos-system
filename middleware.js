import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Protect routes based on authentication
  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/cashier")) {
      return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
  }

  // Role-based access control
  const userRole = token.role

  // Admin routes protection
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  // Cashier routes protection
  if (pathname.startsWith("/cashier") && userRole !== "cashier" && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/cashier/:path*"],
}