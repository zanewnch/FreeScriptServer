import express from "express";

import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
import { UserRepo } from "../model/UserRepo";
import { UserController } from "../controller/UserController";
import { Result } from "../utils/Result";
import { JWT } from "../utils/JWT";

// @ts-ignore
export default (router: express.Router) => {
  const userRepo = new UserRepo();
  const userController = new UserController();
  const checkAuthCookie = new CheckAuthCookie();

  router.post(
    "/api/user/register",
    checkAuthCookie.checkAuthCookie,
    (req: express.Request, res: express.Response) => {
      userController.insertUser(req, res);
    }
  );

  router.post(
    "/api/user/local-signIn",
    checkAuthCookie.checkAuthCookie,

    userController.localSignIn
  );

  router.post(
    "/api/user/google-signIn",
    checkAuthCookie.checkAuthCookie,

    userController.googleSignIn
  );

  router.post(
    "/api/user/local-jwt",

    userController.generateLocalJwtToken
  );

  router.put(
    "/api/user",
    checkAuthCookie.checkAuthCookie,
    userController.updateUser
  );

  router.post("/api/user/set-cookie", (req, res) => {
    let user = req.body;
    if (user["username"]) {
      let token = JWT.createToken(user["username"]);

      // 然而，由於你已經將 httpOnly 選項設置為 true，這個 cookie 不能被 JavaScript 存取，這是一種安全措施，用來防止跨站腳本攻擊（XSS）。
      res
        .cookie("login-token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .send(Result.successWithData(token));
    } else if (user["displayName"]) {
      let token = JWT.createToken(user["displayName"]);

      res
        .cookie("login-token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .send(Result.successWithData(token));
    }
  });
  router.get("/api/user/verify-login", (req, res) => {
    let token = req.cookies["login-token"];
    console.log(token);
    if (token) {
      let result = JWT.verifyToken(token);
      if (result) {
        res.status(200).send(Result.successWithData(result));
      } else {
        res.status(200).send(Result.error("No token"));
      }
    }
  });

  router.get("/api/user/decode-login", (req, res) => {
    let token = req.cookies["login-token"];
    console.log(token);
    if (token) {
      let result = JWT.decodeToken(token);
      console.log(result);
      if (result) {
        res.status(200).send(Result.successWithData(result));
      } else {
        res.status(200).send(Result.error("No token"));
      }
    }
  });
};
