import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const GET = () => {
  cookies().delete('token');
  return NextResponse.json('Cookie deleted', { status: 200})  
}