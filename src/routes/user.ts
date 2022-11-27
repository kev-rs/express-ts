import { Router } from 'express';
import { deleteUser, getUser, getUsers, postUser, updateUser } from '../controllers/user';
import { middleware } from '../middleware/log';

const router = Router();

router
  .get('/', middleware, getUsers)
  .get('/:id', getUser)
  .post('/', postUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)

export { router };
