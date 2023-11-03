import prisma from "../lib/prisma"


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
