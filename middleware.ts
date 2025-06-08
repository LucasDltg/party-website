// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "./src/lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const role = decodedToken.role;

    // Example: Only allow admins to access /admin routes
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // add more paths as needed
};
