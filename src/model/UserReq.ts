import { Request } from "express";
import { User } from "../interface/UserInterface";

export interface UserRes extends Request {
  body: User;
}
