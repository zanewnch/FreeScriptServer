import express from "express";
import { UserController } from "./UserController";
import { Knex } from "../model/Knex";
import { Result } from "../utils/Result";
import { UserRepo } from "./UserRepo";
import { AutoFill } from "../middleware/AutoFill";
import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
// 在test階段, 先不用mvc structure, 先把所有的code寫在router裡面 來加速開發效率
// !add the permission of user, for example: free member and premium member
// !or who has the permission to modify the user data
const router = express.Router();
export default (router: express.Router) => {
  const userController = new UserController();
  const autoFill = new AutoFill();
  const checkAuthCookie = new CheckAuthCookie();

  /*
   莫名其妙爛bug, middleware 不能直接寫在callback function, 他會出現response header already sent的錯誤
   但又一定要callback function, 不然沒辦法寫swagger comment
   所以就出現這種寫法
  */
  router.get(
    "/api/user",
    checkAuthCookie.checkAuthCookie,
    (
      /* 
      #swagger.tags = ['User']
      #swagger.summary = 'get user data'
      #swagger.description = 'if request without any query string, it will return all user data, if request with query string, it will return user data by query string'
      #swagger.parameters['id'] = {
        in: 'query',
        description: 'user id',
        required: false,
        type: 'integer'
      }
      #swagger.parameters['name'] = {
        in: 'query',
        description: 'user name',
        required: false,
        type: 'string'
      }
      #swagger.registrationDate={
        in: 'query',
        description: 'user registration date',
        required: false,
        type: 'string'
      }
      #swagger.lastLoginDate={
        in: 'query',
        description: 'user last login date',
        required: false,
        type: 'string'
      }
      #swagger.userStatus={
        in: 'query',
        description: 'user status',
        required: false,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'Success',
        schema: {
          $ref: "#/definitions/UserGet200"
        }
      }
      #swagger.responses[500] = {
        description: 'Error',
        schema: {
          $ref: "#/definitions/error"
        }
      }

      */
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      userController.get(req, res);
    }
  );

  router.post(
    "/api/user",
    checkAuthCookie.checkAuthCookie,
    (req: express.Request, res: express.Response) => {
      /* 
      #swagger.tags = ['User']
      #swagger.summary = 'create user'
      #swagger.description = 'create user'
      #swagger.parameters['data'] = {
        in: 'body',
        description: 'user data',
        required: true,
        type: 'object',
        schema: {
          $ref: "#/definitions/UserCreateParam"
        }
      }
      #swagger.responses[200] = {
        description: 'Success',
        schema: {
          $ref: "#/definitions/UserGet200"
        }
      }
      #swagger.responses[500] = {
        description: 'Error',
        schema: {
          $ref: "#/definitions/error"
        }
      }
      */
      userController.get(req, res);
    }
  );

  router.put(
    "/api/user",
    checkAuthCookie.checkAuthCookie,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      #swagger.summary = 'update user'
      #swagger.description = 'update user'
      #swagger.parameters['data'] = {
        in: 'body',
        description: 'user data',
        required: true,
        type: 'object',
        schema: {
          $ref: "#/definitions/UserGetParam"
        }
      }
      #swagger.responses[200] = {
        description: 'Success',
        schema: {
          $ref: "#/definitions/UserGet200"
        }
      }
      */
      userController.update(req, res);
    }
  );
  router.delete(
    "/api/user/:id",
    checkAuthCookie.checkAuthCookie,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      */
      userController.delete(req, res);
    }
  );
  router.post(
    "/api/user/login",
    checkAuthCookie.checkAuthCookie,
    autoFill.autoFill,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      */

      userController.login(req, res);
    }
  );
  router.post(
    "/api/user/register",
    checkAuthCookie.checkAuthCookie,
    autoFill.autoFill,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      */

      userController.register(req, res);
    }
  );
  router.get(
    "/api/user/userStatusList",
    checkAuthCookie.checkAuthCookie,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      */
      userController.getUserStatusList(req, res);
    }
  );
  router.get(
    "/api/user/totalDataAmount",
    checkAuthCookie.checkAuthCookie,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      */
      userController.getTotalDataAmount(req, res);
    }
  );
  router.get(
    "/api/user/:pageNum/:pageSize",
    checkAuthCookie.checkAuthCookie,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /* 
      #swagger.tags = ['User']
      */
      userController.getByPage(req, res);
    }
  );
};
