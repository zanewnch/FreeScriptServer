import express from "express";
import jwt from "jsonwebtoken";
export class CheckAuthCookie {
  public checkAuthCookie = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void | express.Response<any, Record<string, any>> => {
    // for testing, just directly return next()
    console.log("checkAuthCookie");
    return next();
    try {
      // Allow requests to "/login" and "/register" to proceed without requiring authToken
      if (
        req.originalUrl.includes("/login") ||
        req.originalUrl.includes("/register")
      ) {
        return next();
      }

      const token = req.cookies["authToken"];

      if (!token) {
        res.sendStatus(401);
        return next();
      }

      jwt.verify(token, "zane", (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        // user example: {zane:"zane"}
        return next();
      });
    } catch (e) {
      console.log(e);
    }
  };
}
