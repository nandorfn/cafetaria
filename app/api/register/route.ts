import { User, registerServerSchema } from "@/app/utils/types";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import prisma from "@/app/lib/prisma";
import { ZodIssue } from "zod";


export const POST = async (req: Request) => {
  const body: User = await req.json();
  const result = registerServerSchema.safeParse(body);
  const id = uuidv4()
  let zodErrors = {}
  
  if (!result.success){
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = {...zodErrors, [issue.path[0]]: issue.message}
    }); 
    
    return NextResponse.json({errors: zodErrors}, {status: 400})
  }
  const existingEmail = await prisma.user.findFirst({
    where: {
      email: result.data.email
    }
  })
  
  if (!existingEmail) {
    await prisma.user.create({
      data: {
        userId: id,
        name: result.data.name,
        avatar: '',
        email: result.data.email,
        salt: result.data.salt,
        password: result.data.hashedPassword,
      }
    })
    
    return NextResponse.json({status: 201})
  }
  else {
    return NextResponse.json({errors: { email: 'Email is already registered!'}}, {status: 400})
  }
}