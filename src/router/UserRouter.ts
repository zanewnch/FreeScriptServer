import express from "express";

import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
import { UserRepo } from "../model/UserRepo";
import { UserController } from '../controller/UserController';

export default (router: express.Router) => {
  const userRepo = new UserRepo();
  const userController = new UserController();

  router.post("/api/user", (req: express.Request, res: express.Response) => {
      userController.insertUser(req, res);
  });
};
