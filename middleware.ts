import { NextResponse } from 'next/server'
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/app/utils/auth";
import { redirect } from "next/navigation";


export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const verifiedToken = token && (await verifyAuth(token))

  if (!verifiedToken || (verifiedToken && verifiedToken.role !== 'admin')) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
  ]
}
