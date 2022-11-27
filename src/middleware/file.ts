import { Request } from "express";
import multer from "multer";

const PATH_STORAGE = `${process.cwd()}/storage`;

type Callback = (error: Error | null, destination: string) => void;

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: Callback) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: Callback) {
    const ext = file.originalname.split(".").pop();
    const fileNameRandom = `image-${Date.now()}.${ext}`;
    cb(null, fileNameRandom);
  },
});

const upload = multer({ storage });

export { upload };