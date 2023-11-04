import prisma from "@/app/lib/prisma";
import { verifyAuth } from "@/app/utils/auth";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));

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

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));

  if (!verifiedToken || (verifiedToken && verifiedToken.role !== 'admin')) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!body) {
    return NextResponse.json({ errors: 'BAD REQUEST' }, { status: 400 });
  }

  await prisma.product.update({
    where: {
      productId: params.id
    },
    data: {
      name: body.name,
      imgLink: body.imgLink,
      description: body.description,
      price: Number(body.price),
      stock: Number(body.stock)
    }
  })
  return NextResponse.json({ status: 200 });


}