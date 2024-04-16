import express from "express";
import { Result } from "../utils/Result";

import { UserRepo } from "../model/UserRepo";
import { User } from "interface/UserInterface";
import { JWT } from "../utils/JWT";

export class UserController {
  private userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }

  public insertUser = async (req: express.Request, res: express.Response) => {
    try {
      /* 
        need to detect whether there is duplicate data
        so use select query to check the data whether is exist

        also need to check whether is google login or local login
        because need to select different key 
      */

      const body: User = req.body;
      

      if (body["password"]) {
        // which mean is local register
        const result = await this.userRepo.getByLocalAccount(body);
        if (result === null || result === undefined) {
          res.status(200).json(Result.error("User already exist"));
        }
      } else if (body["displayName"]) {
        // which mean is google register
        const result = await this.userRepo.getGoogleAccount(body);

        if (result === null || result === undefined) {
          res.status(200).json(Result.error("User already exist"));
        }
      }

      this.userRepo.insertUser(body);
      res.status(200).json(Result.success());
    } catch (e) {
      res.status(400).json(Result.error(e.message));
    }
  };

  public localSignIn = async (req: express.Request, res: express.Response) => {
    try {
      const body: User = req.body;
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
      const body: User = req.body;
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
      const body: User = req.body;
      this.userRepo.updateUser(body);
      res.status(200).json(Result.success());
    } catch (e) {
      res.status(200).json(Result.error(e.message));
    }
  };
}
