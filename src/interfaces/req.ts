import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { PayloadType } from "../utils/jwt";

export interface RequestExt extends Request {
  user?: JwtPayload | PayloadType;
}
