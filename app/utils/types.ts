import { z } from "zod";


// Schema Login Form
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type TLoginSchema = z.infer<typeof loginSchema>;

// Schema Register Server Form
export const registerServerSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email(),
  salt: z.string(),
  hashedPassword: z.string(),
});
export type TRegisterServerSchema = z.infer<typeof registerServerSchema>;

// Scheme Register Client
export const registerSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email('Email cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export type TRegisterSchema = z.infer<typeof registerSchema>;

export const productSchema = z.object({
  name: z.string().min(1, 'Product Name cannot be empty'),
  category: z.string().min(1, 'Product Category cannot be empty'),
  imgLink: z.string().min(1, 'Product Image cannot be empty'),
  stock: z.string().min(1, 'Stock cannot be empty'),
  description: z.string().min(1, 'Description cannot be empty'),
  price: z.string().min(1, 'Price cannot be empty'),
});
export type TProductSchema = z.infer<typeof productSchema>;

export type User = {
  id: number;
  userId: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  avatar: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Token schema
export const tokenSchema = z.object({
  username: z.string(),
  userId: z.string(),
  role: z.string(),
  iat: z.number(),
  exp: z.number(),
})
export type JwtSchema = z.infer<typeof tokenSchema>;

export type Food = {
  id: number;
  name: string;
  category: string;
  imgLink: string;
  stock: number;
  description: string;
  price: number;
}