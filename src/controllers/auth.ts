import { Request, Response } from "express";
import { PrismaClient, User, Status } from '@prisma/client';
import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "../common/auth.schema";
import { handleHttp } from "../utils/error.handle";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSelect } from "../common/user.schema";
import { encrypt, verify } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
// import cookie from 'cookie';

const prisma = new PrismaClient();

type ResponseData = {
  user: {
    email: string; 
    name: string; 
    id: string; 
    status: Status
  };
  token: string;
}

const sign_in = async (req: Request<any, any, LoginSchema>, res: Response<ResponseData>) => {
  const credentials = req.body;

  const check = loginSchema.safeParse(credentials);
  if(!check.success) return handleHttp(401, res, check.error.issues[0].message);

  const check_user = await prisma.user.findUnique({ where: { email: credentials.email } });
  if(!check_user) return handleHttp(404, res, 'Account not found');

  const check_password = await verify({ password: credentials.password,  encrypted_password: check_user.password });
  if(!check_password) return handleHttp(401, res, 'Your password is incorrect');

  const token = await generateToken({
    id: check_user.id,
    name: check_user.name,
    email: check_user.email,
    role: check_user.role,
  });


  res.status(200).json({
    user: {
      id: check_user.id,
      email: check_user.email,
      name: check_user.name,
      status: 'online',
    },
    token
  })
}

const sign_up = async (req: Request<any, any, RegisterSchema>, res: Response) => {
  const user = req.body;

  try {
    const check = registerSchema.safeParse(user);
    if(!check.success) return res.status(400).json({ error: check.error.issues[0].message });

    const check_user = await prisma.user.findUnique({ where: { email: user.email } });
    if(check_user) return res.status(409).json({ error: 'Email already in use' });

    const { password } = await encrypt(user.password);

    const newUser = await prisma.user.create({
      data: { email: user.email, name: user.name, password },
      select: userSelect,
    })

    return res.status(201).json(newUser)
  } catch (err) {
    return handleHttp(500, res, `${(err as { meta: { message: string } }).meta.message as string}`);
  }
}

export { sign_in, sign_up }