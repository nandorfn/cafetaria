import { TProductSchema, productSchema } from "@/app/utils/types";
import { NextResponse } from "next/server";
import { ZodIssue } from "zod";
import { v4 as uuidv4 } from 'uuid';
import prisma from "@/app/lib/prisma";
import { verifyAuth } from "@/app/utils/auth";

export const POST = async (req: Request) => {
  const body: TProductSchema = await req.json();
  if (!body) {
    return NextResponse.json({ errors: 'Request Data Invalid' }, { status: 400 });
  }
  
  const result = productSchema.safeParse(body);
  if (!result.success) {
    let zodErrors = {};
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    });
    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }
  
  const token = req.headers.get('cookie')?.split('=')[1];
  const verifiedToken = token && (await verifyAuth(token));
  if (!verifiedToken || (verifiedToken && verifiedToken.role !== 'admin')) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }
  
  const uuid = uuidv4();
  const product = await prisma.product.create({
    data: {
      productId: uuid,
      name: result.data.name,
      category: result.data.category,
      imgLink: result.data.imgLink,
      description: result.data.description,
      stock: Number(result.data.stock),
      price: Number(result.data.price)
    }
  });

  return NextResponse.json(product, { status: 201 });  
}
