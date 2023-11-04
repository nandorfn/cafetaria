import prisma from "@/app/lib/prisma";
import { verifyAuth } from "@/app/utils/auth";
import { checkStock, createOrderItem, reduceProductStock } from "@/app/utils/queryDb";
import { TOrderItem } from "@/app/utils/types";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export const POST = async (req: Request) => {
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));

  if (!verifiedToken) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }

  const hasSufficientStock = await checkStock(verifiedToken.userId);
  if (!hasSufficientStock) {
    return NextResponse.json({ errors: 'Product stock is less than user request' }, { status: 400 });
  }

  const uuid = uuidv4();
  const Ordered = 'Ordered';
  const order = await prisma.order.create({
    data: {
      orderId: uuid,
      userId: verifiedToken.userId,
      paymentMethod: 'cash',
      status: Ordered
    }
  });


  if (!order) {
    return NextResponse.json({ errors: 'Internal server error' }, { status: 500 });
  }

  const productCart = await prisma.cart.findMany({
    where: {
      userId: verifiedToken.userId
    },
    select: {
      productId: true,
      quantity: true,
    }
  });

  const orderItem = await createOrderItem(productCart, order.orderId);
  const reduceStock = await reduceProductStock(verifiedToken.userId);

  if (!orderItem && !reduceStock) {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: order.orderId
      }
    })

    await prisma.$transaction([
      ...orderItems.map((orderItem: TOrderItem) => {
        return prisma.product.update({
          where: {
            productId: orderItem.productId
          },
          data: {
            stock: {
              increment: orderItem.quantity
            }
          }
        });
      }),

      prisma.orderItem.deleteMany({
        where: {
          orderId: order.orderId
        }
      }),
      prisma.order.delete({
        where: {
          orderId: order.orderId
        }
      })


    ]);
    return NextResponse.json({ errors: 'Order Failed' }, { status: 400 })
  }

  for (const item of orderItem) {
    const product = await prisma.product.findFirst({
      where: {
        productId: item.productId,
      },
    })
    
    if (!product) {
      return NextResponse.json({ errors: 'Internal error' }, { status: 400 })
    }

    await prisma.product.update({
      where: {
        productId: product.productId,
      },
      data: {
        totalSold: product?.totalSold + item.quantity
      }
    })
  }
  return NextResponse.json(order, { status: 201 });
}