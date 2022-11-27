import { Router } from "express";
import { getOrders } from "../controllers/orders";
import { middleware } from "../middleware/session";

const router = Router();

router
  .get('/', middleware, getOrders)

export { router };