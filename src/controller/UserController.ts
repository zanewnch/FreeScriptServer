import express from "express";
import { MySQL } from "../model/MySQL";
import { Knex } from "../model/Knex";
import { User } from "../interface/UserInterface";
import { UserRepo } from "../model/UserRepo";
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
      const query: object = req.query;

      const users: object = await this.userRepo.get(query);
      console.log(1);
      res.status(200).json(Result.successWithData(users));
      console.log(2);
    } catch (e) {
      console.log(3);
      console.log(e);
      res.status(400).json(Result.error(e.message));
    }
  };
  public create = async (req: express.Request, res: express.Response) => {
    try {
      const users: number[] = await this.userRepo.create(req.body.data);

      res.status(200).json(Result.successWithData(users));
    } catch (e) {
      console.log(e);
      res.sendStatus(400).json(Result.error(e.message));
    }
  };
  public update = async (req: express.Request, res: express.Response) => {
    try {
      const users: number = await this.userRepo.update(req.body.data);

      res.status(200).json(Result.successWithData(users));
    } catch (e) {
      console.error(e);
      res.sendStatus(400).json(Result.error(e.message));
    }
  };
  public delete = async (req: express.Request, res: express.Response) => {
    try {
      /*
      path variable 都是string, 並且要一個一個接(不會像query string一樣被包成object)
      */
      const users: number = await this.userRepo.delete(parseInt(req.params.id));

      res.status(200).json(Result.successWithData(users));
    } catch (e) {
      console.error(e);
      return res.sendStatus(400).json(Result.error(e.message));
    }
  };

  public register = async (
    req: express.Request,
    res: express.Response
  ): Promise<number[]> => {
    try {
      // 1. check if the username is already exists, if exists, return error

      const result = await this.userRepo.get({
        username: req.body.data.username,
      });

      if (result.length != 0) {
        res.status(500).json(Result.error("The username is already exists"));
      } else {
        // 2. if not exists, insert into db
        const result: number[] = await this.userRepo.create(req.body);
        res.status(200).json(Result.success());
        return result;
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("The username is already exists"));
    }
  };

  public login = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    // 1. select db with username and password, if not exists, return error
    try {
      // JavaScript's object destructuring
      const user: object = {
        username: req.body.data.username,
        password: req.body.data.passwod,
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
        username: req.body.data.id,
        password: req.body.data.password,
      };
      // get method check whether the
      const result: object[] = await this.userRepo.get(temp_data);

      // if no data, which means there is no exists data in table
      if (result.length == 0) {
        res
          .status(500)
          .json(Result.error("The username or password is incorrect"));
      } else {
        res.status(200).json(Result.successWithData("login success"));
      }
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json(Result.error("The username or password is incorrect"));
    }
  };

  public getUserStatusList = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const result: string[] = await this.knex
        .db("user")
        .distinct("user_status")
        .select();

      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error("Internal server error"));
    }
  };

  public getTotalDataAmount = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      // get totalDataAmount
      const totalquery= this.knex.db("user").count("* as total");
      const getTotal = await totalquery;
      const totalDataAmount: string | number = getTotal[0].total;

      res.status(200).json(Result.successWithData(totalDataAmount));
    } catch (e) {
      console.error(e);
      res.status(400).json(Result.error("no data"));
    }
  };

  public getByPage = async (req: express.Request, res: express.Response) => {
    try {
      const pageNum = parseInt(req.query.pageNum as string) || 1; // default pageNum to 1
      const pageSize = parseInt(req.query.pageSize as string) || 10; // default pageSize to 10
      
      const offset = (pageNum - 1) * pageSize;

      // get MapperReturnValue
      const query = this.knex.db
        .select("*")
        .from("user")
        .offset(offset)
        .limit(pageSize);
      const getData = await query;

      res.status(200).json(Result.successWithData(getData));
    } catch (e) {
      console.error(e);
      res.status(500).json(Result.error(e.message));
    }
  };
}
