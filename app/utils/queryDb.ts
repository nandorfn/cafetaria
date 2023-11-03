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