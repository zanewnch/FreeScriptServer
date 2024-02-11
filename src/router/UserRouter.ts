import express from "express";
import { UserController } from "../controller/UserController";
import { Knex } from "../repository/Knex";
import { Result } from "../utils/Result";
import { UserRepo } from "../repository/UserRepo";
import { AutoFill } from "../middleware/AutoFill";
import {  CheckAuthCookie } from '../middleware/CheckAuthCookie';
const router = express.Router();

// 要把method 轉移到controller

export default (router: express.Router) => {
  const userController = new UserController();
  const autoFill = new AutoFill();
  const checkAuthCookie = new CheckAuthCookie();

  router.get("/api/user/test",(req,res,next)=>{
    checkAuthCookie.checkAuthCookie(req,res,next);
    userController.get(req,res);
  } );

  router.get("/api/user",checkAuthCookie.checkAuthCookie, userController.get);



  router.post("/api/user", userController.create);
  router.put("/api/user", userController.update);
  router.delete("/api/user/:id", userController.delete);
  router.post("/api/user/login",checkAuthCookie.checkAuthCookie, autoFill.autoFill, userController.login);
  router.post("/api/user/register", autoFill.autoFill, userController.register);
  router.get("/api/user/userStatusList", userController.getUserStatusList);
  router.get("/api/user/totalDataAmount", userController.getTotalDataAmount);
  router.get("/api/user/:pageNum/:pageSize", userController.getByPage);
};
