import { Response } from "express";
import { RequestExt } from '../interfaces/req';

const getOrders = async (req: RequestExt, res: Response) => {
  res.status(200).json({ user: req.user ?? '', message: 'Hola' });
}

export { getOrders };