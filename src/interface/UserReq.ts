import { Request } from "express";
import { User } from "./UserInterface";

export interface UserRes extends Request {
  body: User;
}
