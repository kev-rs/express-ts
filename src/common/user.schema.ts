import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  email: true, name: true, id: true
})

export const userSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  email: z.string().min(1, 'Email is required').email(),
  name: z.string().min(1, 'Name is required'),
})

export const userPost = z.object({
  email: z.string().min(1, { message: 'Email is required'}).email(),
  name: z.string().min(1, { message: 'Name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export type UserSchema = z.infer<typeof userSchema>;
export type UserPost = z.infer<typeof userPost>;