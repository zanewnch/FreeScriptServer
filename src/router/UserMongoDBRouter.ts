import express from "express";
import { UserController } from "../controller/UserController";
import { Knex } from "../repository/Knex";
import { Result } from "../utils/Result";
import { UserRepo } from "../repository/UserRepo";
import { AutoFill } from "../middleware/AutoFill";
import { UserMongoDB } from "../repository/UserMongoDB";

export default (router: express.Router) => {
  const userDB = new UserMongoDB();

  router.get("/api/userdbfind", async (req, res) => {
    try {
      const data = await userDB.getUsers();
      res.status(200).json(Result.successWithData(data));
    } catch (e) {
      res.status(500).json(Result.error(e.message));
    }
  });

  router.post("/api/userdb", async (req, res) => {
    const data: object = req.body;
    console.log(data);

    try {
      await userDB.createUser(data);
      res.status(200).json(Result.successWithData("ok"));
    } catch (e) {
      res.status(500).json(Result.error(e.message));
    }
  });

  router.get("/api/test", (req, res) => {
    // which mean request with query string
    if (Object.keys(req.query).length !== 0) {
      const result: object = req.query;
      res.status(200).json(Result.successWithData(result));
    };

    // which mean request with json content
    if (Object.keys(req.body).length !== 0) {
      const result: object = req.body;
      res.status(200).json(Result.successWithData(result));
    };

    // which mean request with path variable
    if(Object.keys(req.params).length !== 0) {
      const result: object = req.params;
      res.status(200).json(Result.successWithData(result));
    };
  });
};
