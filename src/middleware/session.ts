import { NextFunction, Response } from "express";
import { PayloadType, verify } from "../utils/jwt";
import { RequestExt } from '../interfaces/req'

const middleware = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization ?? '').split(' ').pop();
    if(!token) return res.status(401).json({ message: 'No token found' });
    const jwt = await verify(token);
    req.user = jwt as PayloadType;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session is invalid' });
  }
}

export { middleware };
