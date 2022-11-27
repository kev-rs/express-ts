import { Request, Response } from "express";
import { RequestExt } from "../interfaces/req";
import { Storage } from "../interfaces/storage";
import { handleHttp } from "../utils/error.handle";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getFile = async (req: RequestExt, res: Response) => {
  try {
    const { user, file } = req;
    console.log({file});
    const response = await prisma.storage.create({
      data: {
        fileName: file?.filename ?? '',
        user: {
          connect: {
            id: user?.id,
          }
        },
        path: file?.path ?? ''
      },
    })
    res.status(200).send(response);
  } catch (e) {
    console.log({e})
    handleHttp(500, res, "ERROR_GET_BLOG");
  }
};

export { getFile };