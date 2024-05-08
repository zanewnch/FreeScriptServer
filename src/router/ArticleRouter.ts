import express from "express";
import { Result } from "../utils/Result";
import { ArticleController } from "../controller/ArticleController";
import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
import { ArticleRepo } from "../model/ArticleRepo";

export default (router: express.Router) => {
  const articleController = new ArticleController();
  const checkAuthCookie = new CheckAuthCookie();
  const articleRepo = new ArticleRepo();

  router.get("/api/article/setting", (req, res) => {
    res.render("SettingView", {
      username: "zanewnch",
    });
  });

  router.get(
    "/api/article",
    checkAuthCookie.checkAuthCookie,
    articleController.getPaginationArticles
  );

  router.get(
    "/api/article/:author/:title",
    checkAuthCookie.checkAuthCookie,
    articleController.getSpecifiedArticle
  );

  // get data
  router.get(
    "/api/allArticle",
    checkAuthCookie.checkAuthCookie,
    articleController.getAll
  );

  router.get(
    "/api/article/search",
    checkAuthCookie.checkAuthCookie,
    articleController.search
  );

  router.delete(
    "/api/article",
    checkAuthCookie.checkAuthCookie,
    articleController.deleteWithoutContent
  );

  // create data
  router.post(
    "/api/article",
    checkAuthCookie.checkAuthCookie,
    articleController.insertData
  );

  router.get(
    "/api/article/specific-tags-articles",
    checkAuthCookie.checkAuthCookie,
    articleController.getSpecificTagsArticles
  );

  router.get(
    "/api/article/tags",
    checkAuthCookie.checkAuthCookie,
    articleController.getTags
  );

  // publish
  router.post(
    "/api/article/publish",
    checkAuthCookie.checkAuthCookie,
    articleController.publish
  );

  router.get(
    "/api/article/staff-picks",
    checkAuthCookie.checkAuthCookie,
    articleController.getStaffPicks
  );

  // test for knowing frontend send data
  router.get("/api/test", checkAuthCookie.checkAuthCookie, (req, res) => {
    // which mean request with query string
    if (Object.keys(req.query).length !== 0) {
      const result: object = req.query;

      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with json content
    if (Object.keys(req.body).length !== 0) {
      const result: object = req.body;

      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with path variable
    if (Object.keys(req.params).length !== 0) {
      const result: object = req.params;

      res.status(200).json(Result.successWithData(result));
    }
  });
  router.post("/api/test/test", checkAuthCookie.checkAuthCookie, (req, res) => {
    // which mean request with query string
    if (Object.keys(req.query).length !== 0) {
      const result: object = req.query;

      res.status(200).json(Result.successWithData(result));
    }

    // which mean request with json content
    if (Object.keys(req.body).length !== 0) {
      const result: object = req.body;

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
