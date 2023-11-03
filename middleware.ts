import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/utils/auth";
import type { NextRequest } from "next/server";


export async function middleware(req: NextRequest) {   
    const token = req.cookies.get('token')?.value;
    const verifiedToken = token && (await verifyAuth(token))
    
    // if (verifiedToken) {
    //     if (req.nextUrl.pathname.startsWith('/')) {
    //         return NextResponse.redirect(new URL('/store', req.url))        }
    //   }
}

export const config = {
    matcher: [
      '/store',
    ]
  }
