import prisma from "@/app/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const existingCart = await prisma.cart.findFirst({
    where: {
      userId: body.userId,
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
      const newQuantity = Math.min(existingCart.quantity + Number(body.quantity), Math.min(product.stock, 10));
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
        userId: body.userId,
        productId: body.productId,
        quantity: Number(body.quantity)
      }
    })
    return NextResponse.json(newCartItem, { status: 201 });
  }
}