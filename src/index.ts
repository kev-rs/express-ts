import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const app: Express = express();

app.get('/', (req: Request, res: Response<{ message: string }>) => {
  res.status(200).json({ message: 'Hello from express w/ ts :)' })
})