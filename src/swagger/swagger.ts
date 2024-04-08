// the swagger autogen config file

import swaggerAutogen from "swagger-autogen";
import { ArticleDef } from "./ArticleDef";
import { UserDef } from "./UserDef";

/* 
definition part 等於是註冊成
swagger comment 可以使用的變數
*/
const doc = {
  info: {
    title: "Blog API",
    description: "API for a simple blog application",
    version: "1.0.0",
  },
  host: "localhost:8080",
  schemes: ["http"],
  tags: [
    {
      name: "Article",
      description: "API for articles in the blog",
    },
    {
      name: "User",
      description: "API for users in the blog",
    },
    {
      name: "SupermarketSale",
      description: "API for supermarket sale",
    },
  ],
  definitions: {
    success: {
      code: 1,
      msg: "null",
      data: "null",
    },
    error: {
      code: 0,
      msg: "error message",
      data: "null",
    },
    ArticleCreateParam: ArticleDef.articleCreateParam,
    ArticleCreate200: ArticleDef.articleCreate200,
    ArticleGet200: ArticleDef.articleGet200,
    UserLocalSignIn:UserDef.UserLocalSignIn,
    UserGoogleSignIn:UserDef.UserGoogleSignIn,
  },
};

const outputFile = "./swagger_output.json";

// official documentation 說只需要寫router root file 的path,結果根本找不到，一定要一個一個router填進去
const routes = [
  "../router/ArticleRouter.ts",
  "../router/UserRouter.ts",
  "../router/SupermarketSaleRouter.ts",
  "../controller/ArticleController.ts",
];

swaggerAutogen()(outputFile, routes, doc);
