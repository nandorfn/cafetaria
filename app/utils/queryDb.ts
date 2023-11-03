import prisma from "../lib/prisma"


export const getAllFoods = async (filters: any) => {
  const foods = await prisma.product.findMany()
  
  return foods;
}