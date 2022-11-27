import { Request, Response } from 'express';
import { UserSchema, userPost, UserPost, userSelect} from '../common/user.schema';
import { PrismaClient } from '@prisma/client';
import { handleHttp } from '../utils/error.handle';
import { ResponseData } from '../interfaces/response';

const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response<ResponseData<UserSchema[]>>) => {
  try {
    const users = await prisma.user.findMany({ select: userSelect });
    return res.status(200).json({ data: users  });
  } catch (err) {
    return handleHttp(500, res, `${(err as { meta: { message: string } }).meta.message as string}`);
  }
}

const getUser = async (req: Request<{ id: string }>, res: Response<ResponseData<UserSchema>>) => {
  const id = req.params.id;
  if(!id) return handleHttp(400, res, 'ID is required');
  
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if(!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ data: user });
  } catch (err) {
    return handleHttp(500, res, `${(err as { meta: { message: string } }).meta.message as string}`);
  }
}

const postUser = async (req: Request<any, any, UserPost>, res: Response<ResponseData<UserSchema>>) => {
  const user = req.body
  try {
    const check = await userPost.safeParseAsync(user);
    if(!check.success) return handleHttp(400, res, `[check] - ${check.error.issues[0].message}`);

    const check_user = await prisma.user.findUnique({ where: { email: user.email } })
    if(check_user) return handleHttp(400, res, 'User already created');
    
    const new_user = await prisma.user.create({
      data: { ...user },
      select: userSelect
    })

    return res.status(201).json({ data: new_user });
  } catch (err) {
    handleHttp(500, res, `${(err as { meta: { message: string } }).meta.message as string}`);
  }  
}

const updateUser = async (req: Request<{ id: string }, any, UserSchema>, res: Response<ResponseData<UserSchema>>) => {
  const id = req.params.id;
  const user = req.body;
  try {
    const user_updated = await prisma.user.update({ 
      where: { id }, 
      data: {...user},
      select: userSelect,
    });
    return res.status(200).json({ data: user_updated, message: 'User updated' })
  } catch (err) {
    handleHttp(500, res, `${(err as { meta: { message: string } }).meta.message as string}`);
  }
}

const deleteUser = async (req: Request<{ id: string }>, res: Response<ResponseData<UserSchema>>) => {
  const id = req.params.id;
  if(!id) return handleHttp(400, res, 'ID is required');
  
  try {
    const check_user = await prisma.user.findUnique({
      where: { id },
    })

    // if(!check_user) return res.status(404).json({ error: `Not user with id - ${id} exist in the db` })
    if(!check_user) return handleHttp(404, res, `Not user with id - ${id} exist in the db`);

    const user = await prisma.user.delete({
      where: { id },
      select: userSelect
    })
  
    return res.status(200).json({ message: 'User deleted', data: {...user} });
  } catch (err) {
    handleHttp(500, res, `${(err as { meta: { message: string } }).meta.message as string}`);
  }
}

export {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser
}