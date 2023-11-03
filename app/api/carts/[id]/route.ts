import prisma from "@/app/lib/prisma";
import { verifyAuth } from "@/app/utils/auth";
import { NextResponse } from "next/server";

export const PATCH =async (req: Request, { params }: { params: { id: string } }) => {
  console.log(req)
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));
  
  if (!verifiedToken || (verifiedToken && verifiedToken.role !== 'admin')) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  } else {
    const cart = await prisma.cart.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(cart, { status: 200 });
  }
}