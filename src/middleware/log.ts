import { NextFunction, Request, Response } from "express";


const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Log middleware')
  next();
}

export { middleware };