import express from "express";
import { Result } from "../utils/Result";
import { ArticleController } from "../controller/ArticleController";

export default (router: express.Router) => {
  const articleController = new ArticleController();

  /*
    swagger autogen 有一個bug, 如果沒有在router裡面直接寫function, 而是直接 controller, 不管在router function or controller function add swagger comment 他都會找不到.
   
    唯一的solution就是在router 寫function, 然後function 裡面再call controller and middleware(記得要傳req,res,next進去)
   */

  // get data
  router.get("/api/article", (req, res) => {
    /* 
    #swagger.tags = ['Article']
    #swagger.summary = 'Get all articles'
    #swagger.description = 'Get all articles description'
    #swagger.responses[200] = {
      description: 'Success',
      schema: {
        $ref: "#/definitions/ArticleGet200"
      }
    }
    */
    articleController.get(req, res);
  });

  // create data
  router.post("/api/article", (req, res) => {
    /* 
    #swagger.tags = ['Article']
    #swagger.summary = 'Create an article'
    #swagger.description = 'Create an article description'
    #swagger.parameters['data'] = {
      in: 'body',
      description: 'Article interface',
      required: true,
      type: 'object',
      schema: {
        $ref: "#/definitions/ArticleCreateParam"
      }
    }

    #swagger.responses[200] = {
      description: 'Success',
      schema:{
        $ref: "#/definitions/ArticleCreate200"
      }
    }

    #swagger.responses[500] = {
      description: 'Error',
      schema: {
        $ref: "#/definitions/error"
      }
    }
    */
    articleController.create(req, res);
  });

  // publish
  router.post("/api/article/publish", articleController.publish);

  // test for knowing frontend send data
  router.get("/api/test", (req, res) => {
    /* 
      這邊的syntax 是使用 swagger 2.0

       #swagger.tags = ['Article']

       #swagger.summary = 'Get all articles'

       #swagger.description = 'Get all articles description'

        #swagger.parameters['pageNum'] = {
          in: 'query',
          description: 'page number',
          required: true,
          type: 'integer'
        }

        #swagger.parameters['pageSize'] = {
          in: 'query',
          description: 'page size',
          required: true,
          type: 'integer'
        }

        #swagger.responses[200] = {
          description: 'Success',
          schema: {
            code:1,
            msg:"null",
            data:"null",
          }
        }

        #swagger.responses[500] = {
          description: 'Error',
          schema: {
            test:"test"
          }
        }

        #swagger.operationId = 'getAllArticle'

        #swagger.security = [{
          "apiKeyAuth": []
        }]

        #swagger.securityDefinitions = {
          apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-auth-token'
          }
        }
     */

    // which mean request with query string
    if (Object.keys(req.query).length !== 0) {
      const result: object = req.query;
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with json content
    if (Object.keys(req.body).length !== 0) {
      const result: object = req.body;
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with path variable
    if (Object.keys(req.params).length !== 0) {
      const result: object = req.params;
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    }
  });
  router.post("/api/test", (req, res) => {
    // which mean request with query string
    if (Object.keys(req.query).length !== 0) {
      const result: object = req.query;
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with json content
    if (Object.keys(req.body).length !== 0) {
      const result: object = req.body;
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with path variable
    if (Object.keys(req.params).length !== 0) {
      const result: object = req.params;
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    }
  });
};
