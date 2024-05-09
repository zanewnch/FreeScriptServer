import express from "express";

import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
import { UserRepo } from "../model/UserRepo";
import { UserController } from "../controller/UserController";
import { Result } from "../utils/Result";
import { JWT } from "../utils/JWT";
import { AutoFill } from "../middleware/AutoFill";

// @ts-ignore
export default (router: express.Router) => {
  const userRepo = new UserRepo();
  const userController = new UserController();
  const checkAuthCookie = new CheckAuthCookie();
  const autofill = new AutoFill();

  router.get("/api/user/delete-cookie", userController.deleteCookie);

  router.post("/api/user/:pageNum/:pageSize",checkAuthCookie.checkAuthCookie,userController.getUserByPage);

  router.post(
    "/api/user/register-local",
    checkAuthCookie.checkAuthCookie,
    autofill.autoFill,
    userController.insertLocalUser
  );

  router.post(
    "/api/user/register-google",
    checkAuthCookie.checkAuthCookie,
    autofill.autoFill,
    userController.insertGoogleUser
  );

  router.post(
    "/api/user/local-signIn",
    checkAuthCookie.checkAuthCookie,
    autofill.autoFill,
    userController.localSignIn
  );

  router.post(
    "/api/user/google-signIn",
    checkAuthCookie.checkAuthCookie,
    autofill.autoFill,
    userController.googleSignIn
  );

  router.post("/api/user/local-jwt", userController.generateLocalJwtToken);

  router.put(
    "/api/user",
    checkAuthCookie.checkAuthCookie,
    userController.updateUser
  );

  router.post(
    "/api/user/set-cookie",
    userController.setCookie
  );
  router.get("/api/user/verify-login", userController.verifyLogin);

  router.get("/api/user/decode-login", userController.decodeLogin);

  router.get("/api/user/test/test", (req, res) => {
    res.status(200).json(Result.success());
  });
};
