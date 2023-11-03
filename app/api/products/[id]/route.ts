import prisma from "@/app/lib/prisma";
import { verifyAuth } from "@/app/utils/auth";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));
  console.log(params.id)

  if (!verifiedToken || (verifiedToken && verifiedToken.role !== 'admin')) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  } else {
    const product = await prisma.product.delete({
      where: {
        productId: params.id
        }
    });
    return NextResponse.json(product, { status: 200 });
  }
}