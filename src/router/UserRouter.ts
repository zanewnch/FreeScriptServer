import express from "express";

import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
import { UserRepo } from "../model/UserRepo";
import { UserController } from "../controller/UserController";

// @ts-ignore
export default (router: express.Router) => {
  const userRepo = new UserRepo();
  const userController = new UserController();

  router.post("/api/user", (req: express.Request, res: express.Response) => {
    userController.insertUser(req, res);
  });

  router.post(
    "/api/user/local-signIn",
    (req: express.Request, res: express.Response) => {
      /*

    #swagger.tags = ['User']
    #swagger.summary = 'User local login'

    #swagger.parameters['data'] = {
      in: 'body',
      description: 'user data',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/UserLocalSignIn" }
    }

    #swagger.responses[200] = {
      description: 'Success',
      schema: { $ref: "#/definitions/success" }
    }

    #swagger.responses[400] = {
      description: 'Error',
      schema: { $ref: "#/definitions/error" }
    }
    */
      

      userController.localSignIn(req, res);
    }
  );

  router.post(
    "/api/user/google-signIn",
    (req: express.Request, res: express.Response) => {
      /* 
    #swagger.tags = ['User']
    #swagger.summary = 'User google login'

    #swagger.parameters['data'] = {
      in: 'body',
      description: 'user data',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/UserGoogleSignIn" }
    }

    #swagger.responses[200] = {
      description: 'Success',
      schema: { $ref: "#/definitions/success" }
    }

    #swagger.responses[400] = {
      description: 'Error',
      schema: { $ref: "#/definitions/error" }
    }
    */

      userController.googleSignIn(req, res);
    }
  );

  router.post("/api/user/local-jwt", (req: express.Request, res: express.Response) => {
    userController.generateLocalJwtToken(req, res);

  });

  
};
