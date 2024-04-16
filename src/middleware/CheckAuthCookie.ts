import express from "express";
import jwt from "jsonwebtoken";
import { Result } from "../utils/Result";
import { JWT } from "../utils/JWT";

export class CheckAuthCookie {
  public checkAuthCookie = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void | express.Response<any, Record<string, any>> => {
    // for testing, just directly return next()

    try {
      // for testing, just directly return next()
      // return next();

      // Allow requests to "/login" and "/register" to proceed without requiring authToken

      if (
        req.originalUrl.includes("/local-signIn") ||
        req.originalUrl.includes("/register") ||
        req.originalUrl.includes("/google-signIn")
      ) {
        return next();
      }

      // detect cookie for login
      if (req.cookies["login-token"]) {
        return next();
      }

      /* 
      這邊是舊方法, 是檢查 request header, 但因為不是cookie, 如果開新分頁或重新整理, request header 會消失, 所以改用cookie
      */
      // if (req.headers["authorizationlocal"]) {
      //   const token: string | string[] = req.headers["authorizationlocal"];

      //   if (typeof token === "string") {
      //     let actualToken = token.split(" ")[1];
      //     if(JWT.verifyToken(actualToken)) return next();

      //   }
      // } else if (req.headers["authorizationgoogle"]) {
      //   const token: string | string[] = req.headers["authorizationgoogle"];

      //   if (typeof token === "string") {
      //     /*
      //     這邊先不驗證  因為這是google 提供的jwt 應該要直接去db select 看有沒有才對
      //     */

      //     return next();
      //   }
      // } else {
      //   res.status(200).json(Result.error("No token found"));
      // }
    } catch (e) {
      console.log(e);
    }
  };
}
