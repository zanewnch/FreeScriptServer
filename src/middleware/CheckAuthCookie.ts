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
      // Allow requests to "/login" and "/register" to proceed without requiring authToken
      if (
        req.originalUrl.includes("/login") ||
        req.originalUrl.includes("/register")
      ) {
        return next();
      }

      if (req.headers["authorizationlocal"]) {
        const token: string | string[] = req.headers["authorizationlocal"];

        if (typeof token === "string") {
          let actualToken = token.split(" ")[1];
          if(JWT.verifyToken(actualToken)) return next();
          
        }
      } else if (req.headers["authorizationgoogle"]) {
        const token: string | string[] = req.headers["authorizationgoogle"];

        if (typeof token === "string") {
          /* 
          這邊先不驗證  因為這是google 提供的jwt 應該要直接去db select 看有沒有才對
          */

          return next();
        }
      } else {
        res.status(200).json(Result.error("No token found"));
      }
    } catch (e) {
      console.log(e);
    }
  };
}
