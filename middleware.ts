import { NextResponse } from 'next/server'
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/app/utils/auth";
import { redirect } from "next/navigation";


export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const verifiedToken = token && (await verifyAuth(token))

  if (!verifiedToken) {
    
  }
}

// export const config = {
//   matcher: [
//     '/store',
//   ]
// }
