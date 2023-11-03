import { cache } from "react";
import prisma from "../lib/prisma"
import { cart } from "./types";


export const getAllFoods = async (filters: any) => {
  const foods = await prisma.product.findMany({
    where: {
      category: filters.params.category,
    }
  })
  
  return foods;
}

export const getAllProducts = async () => {
  return await prisma.product.findMany()
}

type selectCart = Pick<cart, 'productId' | 'quantity'>;
export const createOrderItem = async (productCart: selectCart[], orderId: string) => {
  const createdOrderItems = [];

  for (const product of productCart) {
    const createdOrderItem = await prisma.orderItem.create({
      data: {
        orderId,
        productId: product.productId,
        quantity: product.quantity
      }
    });

    createdOrderItems.push(createdOrderItem);
  }

  return createdOrderItems;
}

async function checkStockOrReduceStock(userId: string, operation: 'check' | 'reduce') {
  const productCart = await prisma.cart.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      productId: true,
      quantity: true,
    }
  });

  for (const product of productCart) {
    const productStored = await prisma.product.findFirst({
      where: {
        productId: product.productId
      }
    });

    if (!productStored) {
      return false;
    }

    if (operation === 'check' && product.quantity > productStored.stock) {
      return false;
    } else if (operation === 'reduce') {
      if (product.quantity > productStored.stock) {
        return false;
      } else {
        await prisma.product.update({
          where: {
            productId: product.productId
          },
          data: {
            stock: productStored.stock - product.quantity
          }
        });

        await prisma.cart.deleteMany({
          where: {
            productId: product.productId
          }
        });
      }
    }
  }
  return true;
}

export const checkStock = async (userId: string) => {
  return checkStockOrReduceStock(userId, 'check');
}

export const reduceProductStock = async (userId: string) => {
  return checkStockOrReduceStock(userId, 'reduce');
}

const getOrderItemsWithProducts = async (order: any) => {
  const orderData = await prisma.order.findFirst({
    where: {
      orderId: order.orderId,
    }
  })

  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: order.orderId,
    }
  });

  const orderItemsWithProducts = [];
  for (const item of orderItems) {
    const product = await prisma.product.findUnique({
      where: {
        productId: item.productId
      },
      select: {
        name: true,
        price: true,
        imgLink: true,
      }
    });

    const combinedObject = {
      ...item,
      ...product,
      paymentMethod: order.paymentMethod,
      status: orderData?.status,
      orderDate: orderData?.createdAt
    };

    orderItemsWithProducts.push(combinedObject);
  }

  return orderItemsWithProducts;
};


export const getOrderProducts = cache(async () => {
  const allOrder = await prisma.order.findMany();
  
  if (!allOrder || allOrder.length === 0) {
    return [];
  }

  type TOrder = {
    id: number;
    orderId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    paymentMethod: string;
    status: string;
  }

  const allData = await Promise.all(
    allOrder.map(async (order: TOrder) => {
      const orderItems = await prisma.orderItem.findMany({
        where: {
          orderId: order.orderId,
        },
        select: {
          productId: true,
          quantity: true,
        },
      });

      const validOrderItems = Array.isArray(orderItems) ? orderItems : [];
      const orderData = {
        ...order,
        orderItems: validOrderItems,
      };

      const products = await Promise.all(
        orderItems.map(async (item: any) => {
          const product = await prisma.product.findFirst({
            where: {
              productId: item.productId,
            },
            select: {
              name: true,
              price: true,
            }
          });
          return product;
        })
      );

      orderData.orderItems = orderItems.map((item: any, index: number) => ({
        productId: item.productId,
        quantity: item.quantity,
        ...products[index],
      }));

      return orderData;
    })
  );
  return allData;
});