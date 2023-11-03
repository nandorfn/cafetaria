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
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }

  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId: verifiedToken.userId
      }
    });

    const combinedData = [];

    for (const cart of carts) {
      const product = await prisma.product.findFirst({
        where: {
          productId: cart.productId
        }
      });

      combinedData.push({
        quantity: cart.quantity,
        ...product
      });
    }

    return NextResponse.json(combinedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errors: 'Internal Server Error' }, { status: 500 });
  }
}

