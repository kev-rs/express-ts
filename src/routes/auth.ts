import { Router } from 'express';
import { sign_in, sign_up } from '../controllers/auth';

const router = Router();

router
  .post('/login', sign_in)
  .post('/register', sign_up)

export { router };