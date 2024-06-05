import express from "express";
import { Result } from "../utils/Result";
import { UpdateResult } from "mongodb";
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
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export class UserController {
  private userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }

  public deleteCookie = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    res.clearCookie("login-token");
    res
      .status(200)
      .json(
        Result.successWithData("Successful delete the login-token cookie.")
      );
  };

  public insertLocalUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
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
      console.log(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public insertGoogleUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
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
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public decodeLogin = (req: express.Request, res: express.Response): void => {
    try {
      let token: string | undefined = req.cookies["login-token"];

      if (token) {
        let result: string | JwtPayload | null = JWT.decodeToken(token);

        if (result) {
          res.status(200).json(Result.successWithData(result));
        } else {
          res.status(400).json(Result.error("The token is invalid"));
        }
      } else {
        // Add an else clause to handle the case where there is no token
        res.status(400).json(Result.error("No token provided"));
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public verifyLogin = (req: express.Request, res: express.Response): void => {
    try {
      const token: string | undefined = req.cookies["login-token"];

      if (token) {
        let result: boolean = JWT.verifyToken(token);

        if (result) {
          res.status(200).send(Result.successWithData(result));
        } else {
          res.status(400).send(Result.error("No token"));
        }
      } else {
        res.status(400).send(Result.error("No token provided"));
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("The request without token provided"));
    }
  };

  public setCookie = (req: express.Request, res: express.Response): void => {
    let user: User = req.body;
    if (user["username"]) {
      let token: string = JWT.createToken(user["username"]);

      // 這可能是由於你的 cookie 設定中的 secure 選項。當 secure 選項設為 true 時，cookie 只會在 HTTPS 連線中被傳送。如果你的 http://58.115.128.46:8080 伺服器並未使用 HTTPS，那麼 cookie 將不會被設定。
      // 如果你的伺服器並未使用 HTTPS，你可以將 secure 選項設為 false：

      // 然而，由於你已經將 httpOnly 選項設置為 true，這個 cookie 不能被 JavaScript 存取，這是一種安全措施，用來防止跨站腳本攻擊（XSS）。

      // 這是替代方案  但是可以正常運作
      res
        .cookie("login-token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(200)
        .send(Result.successWithData(token));

      // 常規版本  但會導致http://58.115.128.46:5173/ 連 http://58.115.128.46:8080/ 的時候  setCookie function 一直失常
      // res
      //   .cookie("login-token", token, {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: "none",
      //   })
      //   .status(200)
      //   .send(Result.successWithData(token));
    } else if (user["displayName"]) {
      let token: string = JWT.createToken(user["displayName"]);

      res
        .cookie("login-token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .send(Result.successWithData(token));
    } else {
      res.status(400).send(Result.error("No token"));
    }
  };

  public localSignIn = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const body: LocalUser = req.body;
      const result: LocalUserDocument | null =
        await this.userRepo.getByLocalAccount(body);

      // if the user is not found
      if (!result) {
        res.status(404).json(Result.error("User not found"));
        return;
      } else {
        res.status(200).json(Result.successWithData(result));
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public googleSignIn = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const body: GoogleUser = req.body;
      const result: GoogleUserDocument | null =
        await this.userRepo.getGoogleAccount(body);

      // if the user is not found
      if (!result) {
        res.status(404).json(Result.error("User not found"));

        return;
      } else {
        res.status(200).json(Result.successWithData(result));
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public generateLocalJwtToken = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const user: LocalUser = req.body;

      const jwtToken: string = JWT.createToken(user["username"]);

      res.status(200).json(Result.successWithData(jwtToken));
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public getUserByPage = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      //  path variable都會是string, 所以要轉成int
      const page = parseInt(req.params.pageNum) || 1; // default pageNum to 1
      const pageSize = parseInt(req.params.pageSize) || 10; // default pageSize to 10
      const result: UserDocument[] | [] = await this.userRepo.getPaginatedUsers(
        page,
        pageSize
      );
      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };

  public updateUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const body: User = req.body;
      const result: UserDocument & {
        _id: mongoose.Types.ObjectId;
      } = await this.userRepo.updateUser(body);

      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal Server Error"));
    }
  };
}
