import express from "express";
import { MySQL } from "../repository/MySQL";
import { Knex } from "../repository/Knex";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";
import { Result } from "../utils/Result";
import jwt from "jsonwebtoken";

/*
spring boot 假設有query string, 是要在controller params 一個一個寫，但是在express 接收的時候，會直接把所有query string encapsulated in an object
*/

/*
If frontend send data with 
1. query string: req.query
2. path variable: req.params
3. json: req.body
*/
export class UserController {
  private mysql: MySQL;
  private userRepo: UserRepo;
  private knex: Knex;
  constructor() {
    this.mysql = new MySQL();
    this.userRepo = new UserRepo();
    this.knex = new Knex();
  }

  public getByBasicWay = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      this.mysql.connection.query("SELECT * FROM user", (error, results) => {
        if (error) {
          throw error;
        }
        res.json(results);
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  public get = async (req: express.Request, res: express.Response) => {
    try {
      /*
      不管幾個query string, 都會直接被包成object
      */
      console.log("The original url:");
      console.log(req.originalUrl);

      const users: object = await this.userRepo.get(req.query);
      console.log(req.query);
      
      res.status(200).json(Result.successWithData(users));
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  };
  public create = async (req: express.Request, res: express.Response) => {
    try {
      const users = await this.userRepo.create(req.body);

      res.status(200).json(Result.success());
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json(Result.error("error"));
    }
  };
  public update = async (req: express.Request, res: express.Response) => {
    try {
      const users = await this.userRepo.update(req.body);

      res.status(200).json(Result.success());
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json(Result.error("error"));
    }
  };
  public delete = async (req: express.Request, res: express.Response) => {
    try {
      /*
      path variable 都是string, 並且要一個一個接(不會像query string一樣被包成object)
      */
      const users = await this.userRepo.delete(parseInt(req.params.id));

      res.status(200).json(Result.success());
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json(Result.error("error"));
    }
  };

  public register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      // 1. check if the username is already exists, if exists, return error

      const result = await this.userRepo.get({ username: req.body.username });

      if (result.length != 0) {
        res.status(500).json(Result.error("The username is already exists"));
      } else {
        // 2. if not exists, insert into db
        const result = await this.userRepo.create(req.body);
        res.status(200).json(Result.success());
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(Result.error("The username is already exists"));
    }

    return next();
  };

  public login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. select db with username and password, if not exists, return error
    try {
      // JavaScript's object destructuring
      const user: object = {
        username: req.body.username,
        password: req.body.passwod,
      };

      const secretKey: string = "zane";

      // Generate the JWT token
      // expiration data for jwt token
      const JwtToken: string = jwt.sign(user, secretKey, {
        expiresIn: "7d", // 7days
      });

      // Set cookie with token
      res.cookie("authToken", JwtToken, {
        httpOnly: true, // The cookie is not accessible to the client-side JS
        secure: true, // The cookie is sent over HTTPS only
        sameSite: "strict", // The cookie is not sent with cross-site requests
        maxAge: 3600000, // Cookie expiration set to 1 hour (3600000ms)
        // When the maxAge of a cookie is reached, the cookie becomes invalid, and the browser will automatically remove it.
      });

      // 这行代码中的await关键字用于等待异步操作的完成，并将控制权暂时交还给事件循环，直到操作完成后才继续执行后续的代码。
      // update 要給id
      // await this.userRepo.update(req.body);

      /*
      因為在middleware 有加了registration and lastLogin, 所以直接用get(req.body)會找不到
      */

      const temp_data: object = {
        username: req.body.id,
        password: req.body.password,
      };
      // get method check whether the
      const result: object[] = await this.userRepo.get(temp_data);
      console.log("The params:");
      console.log(result);

      // if no data, which means there is no exists data in table
      if (result.length == 0) {
        res
          .status(500)
          .json(Result.error("The username or password is incorrect"));
      } else {
        res.status(200).json(Result.success());
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(Result.error("The username or password is incorrect"));
    }

    return next();
  };

  public getUserStatusList = async (
    req: express.Request,
    res: express.Response
  ) => {
    const result = await this.knex.db("user").distinct("user_status").select();

    res.status(200).json(Result.successWithData(result));
  };

  public getTotalDataAmount = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      // get totalDataAmount
      const totalquery = this.knex.db("user").count("* as total");
      const getTotal = await totalquery;
      const totalDataAmount: string | number = getTotal[0].total;

      res.status(200).json(Result.successWithData(totalDataAmount));
    } catch (e) {
      console.log(e);
      res.status(400).json(Result.error("no data"));
    }
  };

  public getByPage = async (req: express.Request, res: express.Response) => {
    try {
      //  path variable都會是string, 所以要轉成int
      const page = parseInt(req.params.pageNum) || 1; // default pageNum to 1
      const pageSize = parseInt(req.params.pageSize) || 10; // default pageSize to 10
      const offset = (page - 1) * pageSize;

      // get MapperReturnValue
      const query = this.knex.db
        .select("*")
        .from("user")
        .offset(offset)
        .limit(pageSize);
      const getData = await query;

      res.status(200).json(Result.successWithData(getData));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
