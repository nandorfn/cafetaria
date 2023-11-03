import prisma from "@/app/lib/prisma";
import { verifyAuth } from "@/app/utils/auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));
  
  if (!verifiedToken) {
    return NextResponse.json({ errors: 'Unauthorized: PLease Login add cart!' }, { status: 401 })  }
  
  const existingCart = await prisma.cart.findFirst({
    where: {
      userId: verifiedToken.userId,
      productId: body.productId,
    }
  })

  if (existingCart) {
    const product = await prisma.product.findFirst({
      where: {
        productId: existingCart.productId
      }
    });

    if (product) {
      const newQuantity = Math.min(existingCart.quantity + 1);
      const updatedCartItem = await prisma.cart.update({
        where: {
          id: existingCart.id
        },
        data: {
          quantity: newQuantity
        }
      });
      revalidateTag('/store')
      return NextResponse.json(updatedCartItem, { status: 200 });
    } else {
      return NextResponse.json({ errors: "Product doesn't exist!" }, { status: 404 });
    }

  } else {
    const newCartItem = await prisma.cart.create({
      data: {
        userId: verifiedToken.userId,
        productId: body.productId,
        quantity: 1
      }
    })
    return NextResponse.json(newCartItem, { status: 201 });
  }
}
export const GET = async (req: Request) => {
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));
  
  if (!verifiedToken) {
    return NextResponse.json({errors: 'Unathorized'}, { status: 200})
  }

  const carts = await prisma.cart.findMany({
    where: {
      userId: verifiedToken.userId
    }
  })
  
  return NextResponse.json(carts, { status: 200})
}