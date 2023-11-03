import { loginSchema } from "@/app/utils/types";
import { NextResponse } from "next/server"
let bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import prisma from "@/app/lib/prisma";

export const POST = async (req: Request) => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  const body: unknown = await req.json();
  const result = loginSchema.safeParse(body);

  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    });

    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    }
  });

  if (!user) {
    return NextResponse.json({ errors: { email: "User not found" } }, { status: 404 });
  } else {
    const checkPass = bcrypt.compareSync(
      result.data.password,
      user.password
    );

    if (!checkPass) {
      return NextResponse.json({ errors: { password: "Invalid password" } }, { status: 401 });
    } else {
      const token = jwt.sign({
        username: user.name,
        userId: user.userId,
        role: user.role
      },
        JWT_SECRET!, {
        expiresIn: '30d'
      });
      cookies().set('token', token, {
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 2592000,
      })
      return NextResponse.json({ status: 200 });
    }
  }
}