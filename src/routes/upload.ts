import { Router } from "express";
import { getFile } from "../controllers/upload";
import { upload } from "../middleware/file";
import { middleware } from "../middleware/session";

const router = Router();

router
  .post('/', middleware, upload.single('myfile'), getFile)

export { router };