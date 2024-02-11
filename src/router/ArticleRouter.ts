import express from "express";
import { Result } from "../utils/Result";
import { ArticleController } from '../controller/ArticleController';
// ! write API documentation to explain the request and response data type and structure
export default (router: express.Router) => {
    const articleController = new ArticleController();

    // get data
    router.get('/api/article', articleController.get);

    // create data
    router.post('/api/article', articleController.create);
    // publish 
    router.post('/api/article/publish', articleController.publish);

    // test for knowing frontend send data
    router.get("/api/test", (req, res) => {
        // which mean request with query string
        if (Object.keys(req.query).length !== 0) {
          const result: object = req.query;
          console.log(result);
          res.status(200).json(Result.successWithData(result));
        };
    
        // which mean request with json content
        if (Object.keys(req.body).length !== 0) {
          const result: object = req.body;
          console.log(result);
          res.status(200).json(Result.successWithData(result));
        };
    
        // which mean request with path variable
        if(Object.keys(req.params).length !== 0) {
          const result: object = req.params;
          console.log(result);
          res.status(200).json(Result.successWithData(result));
        };
      });
      router.post("/api/test", (req, res) => {
        // which mean request with query string
        if (Object.keys(req.query).length !== 0) {
          const result: object = req.query;
          console.log(result);
          res.status(200).json(Result.successWithData(result));
        };
    
        // which mean request with json content
        if (Object.keys(req.body).length !== 0) {
          const result: object = req.body;
          console.log(result);
          res.status(200).json(Result.successWithData(result));
        };
    
        // which mean request with path variable
        if(Object.keys(req.params).length !== 0) {
          const result: object = req.params;
          console.log(result);
          res.status(200).json(Result.successWithData(result));
        };
      });

}