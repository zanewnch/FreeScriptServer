import express from "express";
import User from "../deprecated/UserRouter";
import test from "./testQuick";
import SupermarketSale from "./SupermarketSaleRouter";
import ArticleRouter from "./ArticleRouter";
import UserNoSQL from "./UserRouter";

const router = express.Router();
export default (): express.Router => {
  test(router);
  // User(router);
  UserNoSQL(router);
  SupermarketSale(router);
  ArticleRouter(router);

  return router;
};
