import { Response } from "express";

const handleHttp = (status: number, res: Response, error: string) => {
  res.status(status).json({ error });
}

export { handleHttp };