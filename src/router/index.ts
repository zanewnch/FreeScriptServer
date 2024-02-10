import express from "express";
import User from "./UserRouter";
import test from "./testQuick";
import SupermarketSale from "./SupermarketSaleRouter";
import ArticleRouter from './ArticleRouter';

const router = express.Router();
export default (): express.Router => {
  test(router);
  User(router);
  SupermarketSale(router);
  ArticleRouter(router);

  return router;
};
