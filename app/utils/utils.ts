import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
let bcrypt = require('bcryptjs');


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPass = (unHashPass: string) => {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(unHashPass, salt)
  return { salt, hashedPassword }
}