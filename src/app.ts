import 'dotenv/config'
import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { router } from './routes';

const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT ?? 3005;

app.use(cors())
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App running at port - ${port}`)
})