import express from "express";
import { Result } from "../utils/Result";
import { ArticleController } from "../controller/ArticleController";
import { CheckAuthCookie } from "../middleware/CheckAuthCookie";
import { ArticleRepo } from "../model/ArticleRepo";
import { ArticleMysqlRepo } from "../model/ArticleMysqlrepo";
import { GenerateFakeData } from "../utils/ContentGenerate";
import { Article } from "../interface/ArticleInterface";
import { Knex } from "../model/Knex";
import { ParsedQs } from "qs";

export default (router: express.Router) => {
  const articleController = new ArticleController();
  const checkAuthCookie = new CheckAuthCookie();
  const articleRepo = new ArticleRepo();
  const articleMysqlRepo = new ArticleMysqlRepo();
  const knex = new Knex();

  router.get("/api/content/bar-chart", async (req, res) => {
    try {
      const mostLikedTag = await knex
        .db("articles")
        .select("tag")
        .sum("like as total_likes")
        .groupBy("tag")
        .orderBy("total_likes", "desc")
        .limit(5);
      // .first();

      res.status(200).json(Result.successWithData(mostLikedTag));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the most liked tag" });
    }
  });

  router.get("/api/content/comprehensive-search", async (req, res) => {
    try {
      const minPublishedDate = await knex
        .db("articles")
        .min("publishedDate as min");
      const maxPublishedDate = await knex
        .db("articles")
        .max("publishedDate as max");
      const minDate = minPublishedDate[0].min;
      const maxDate = maxPublishedDate[0].max;

      const query: ParsedQs = req.query;
      const pageNum: number = query.pageNum ? Number(query.pageNum) : 1;
      const pageSize: number = query.pageSize ? Number(query.pageSize) : 10;
      const viewsAmount: number = query.views ? Number(query.views) : 0;
      const likeAmount: number = query.like ? Number(query.like) : 0;

      const startDate = query.startDate ? query.startDate : minDate;
      const endDate = query.endDate ? query.endDate : maxDate;

      let knexQuery = knex
        .db("articles")
        .where("views", ">=", viewsAmount)
        .where("like", ">=", likeAmount)
        .orderBy("publishedDate", "desc")
        .limit(pageSize)
        .offset((pageNum - 1) * pageSize);

      if (startDate && endDate) {
        knexQuery = knexQuery.whereBetween("publishedDate", [
          new Date(startDate),
          new Date(endDate),
        ]);
      }

      const results = await knexQuery;

      res.status(200).json(Result.successWithData(results));
    } catch (e) {
      console.log(e);
      res.status(500).json(Result.error("interval error"));
    }
  });

  router.get(
    "/api/content/filter-views",
    checkAuthCookie.checkAuthCookie,
    async (req, res) => {
      try {
        const query: ParsedQs = req.query;
        const pageNum: number = Number(query.pageNum);
        const pageSize: number = Number(query.pageSize);
        const viewsAmount: number = Number(query.views);
        const data = await knex
          .db("articles")
          .select("*")
          .where("views", "<", viewsAmount)
          .limit(pageSize)
          .offset((pageNum - 1) * pageSize);
        res.status(200).json(Result.successWithData(data));
      } catch (e) {
        console.log(e);
        res.status(500).json(Result.error("interval error"));
      }
    }
  );

  router.get(
    "/api/content/filter-like",
    checkAuthCookie.checkAuthCookie,
    async (req, res) => {
      // 500 1000 5000
      try {
        const query: ParsedQs = req.query;
        const pageNum: number = Number(query.pageNum);
        const pageSize: number = Number(query.pageSize);
        const likeAmount: number = Number(query.like);
        const data = await knex
          .db("articles")
          .select("*")
          .where("like", "<", likeAmount)
          .limit(pageSize)
          .offset((pageNum - 1) * pageSize);
        res.status(200).json(Result.successWithData(data));
      } catch (e) {
        console.log(e);
        res.status(500).json(Result.error("interval error"));
      }
    }
  );

  router.get(
    "/api/content/tags-list",
    checkAuthCookie.checkAuthCookie,
    async (req, res) => {
      try {
        const result = await knex.db("articles").distinct("tag");
        const list = result.map((row) => row.tag);
        if (result.length === 0) {
          res.status(400).json(Result.error("Can not find data"));
        }
        res.status(200).json(Result.successWithData(list));
      } catch (e) {
        console.log(e);
        res.status(500).json(Result.error("interval error"));
      }
    }
  );

  router.get(
    "/api/content/total-amount",
    checkAuthCookie.checkAuthCookie,
    async (req, res) => {
      try {
        const result = await knex.db("articles").count("* as total");
        const totalAmount = result[0].total;
        if (result.length === 0) {
          res.status(400).json(Result.error("Can not find data"));
        }

        res.status(200).json(Result.successWithData(totalAmount));
      } catch (e) {
        console.log(e);
        res.status(500).json(Result.error("interval error"));
      }
    }
  );

  router.get(
    "/api/content",
    checkAuthCookie.checkAuthCookie,
    async (req, res) => {
      try {
        const query: ParsedQs = req.query;
        const pageNum: number = Number(query.pageNum);
        const pageSize: number = Number(query.pageSize);
        const result: Article[] =
          await articleMysqlRepo.getArticlesByPagination(pageNum, pageSize);

        res.status(200).json(Result.successWithData(result));
      } catch (e) {
        console.log(e);
        res.status(500).json(Result.error("interval error"));
      }
    }
  );

  router.post(
    "/api/content/insert-fake-data",
    checkAuthCookie.checkAuthCookie,
    async (req, res) => {
      try {
        const generateFakeData = new GenerateFakeData();
        let result: Article = await generateFakeData.main();
        await articleMysqlRepo.insert(result);
        res.status(200).json(Result.success());
      } catch (e) {
        console.log(e);
        res.status(500).json(Result.error("Interval Error"));
      }
    }
  );

  router.get(
    "/api/article/setting",
    checkAuthCookie.checkAuthCookie,
    (req, res) => {
      res.render("SettingView", {
        username: "zanewnch",
      });
    }
  );

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
