import express from "express";
import { Result } from "../utils/Result";

import { UserRepo } from "../model/UserRepo";
import {
  LocalUser,
  GoogleUser,
  LocalUserDocument,
  GoogleUserDocument,
  User,
  UserDocument,
} from "interface/UserInterface";
import { JWT } from "../utils/JWT";

export class UserController {
  private userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }

  // !要做update-time and register time 的處理
  public insertLocalUser = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const body: LocalUser = req.body;

      const result: null | LocalUserDocument =
        await this.userRepo.getByLocalAccount(body);
      if (result !== null) {
        res.status(409).json(Result.error("User already exist"));
        return;
      }
      this.userRepo.insertUser(body);
      res.status(200).json(Result.success());
    } catch (e) {
      console.log(e.message);
    }
  };

  public insertGoogleUser = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const body: GoogleUser = req.body;

      const result: GoogleUserDocument | null =
        await this.userRepo.getGoogleAccount(body);

      if (result !== null) {
        res.status(409).json(Result.error("User already exist"));
        return;
      }

      this.userRepo.insertUser(body);
      res.status(200).json(Result.success());
    } catch (e) {
      console.log(e.message);
    }
  };

  public decodeLogin = (req: express.Request, res: express.Response) => {
    let token = req.cookies["login-token"];
    console.log(token);
    if (token) {
      let result = JWT.decodeToken(token);
      console.log(result);
      if (result) {
        res.status(200).json(Result.successWithData(result));
      } else {
        res.status(200).json(Result.error("No token"));
      }
    } else {
      // Add an else clause to handle the case where there is no token
      res.status(400).json(Result.error("No token provided"));
    }
  };

  public verifyLogin = (req: express.Request, res: express.Response) => {
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
  };

  public setCookie = (req: express.Request, res: express.Response) => {
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
  };

  public localSignIn = async (req: express.Request, res: express.Response) => {
    try {
      const body: LocalUserDocument = req.body;
      const result = await this.userRepo.getByLocalAccount(body);

      // if the user is not found
      if (!result) {
        res.status(200).json(Result.error("User not found"));
        return;
      } else {
        res.status(200).json(Result.successWithData(result));
      }
    } catch (e) {
      res.status(400).json(Result.error(e.message));
    }
  };

  public googleSignIn = async (req: express.Request, res: express.Response) => {
    try {
      const body: GoogleUserDocument = req.body;
      const result = await this.userRepo.getGoogleAccount(body);

      // if the user is not found
      if (!result) {
        res.status(200).json(Result.error("User not found"));
        console.log("User not found");
        return;
      } else {
        res.status(200).json(Result.successWithData(result));
      }
    } catch (e) {
      res.status(200).json(Result.error(e.message));
    }
  };

  public generateLocalJwtToken = async (
    req: express.Request,
    res: express.Response
  ) => {
    const user = req.body;

    const jwtToken = JWT.createToken(user["username"]);

    res.status(200).json(Result.successWithData(jwtToken));
  };

  public updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const body: UserDocument = req.body;
      this.userRepo.updateUser(body);
      res.status(200).json(Result.success());
    } catch (e) {
      res.status(200).json(Result.error(e.message));
    }
  };
}
