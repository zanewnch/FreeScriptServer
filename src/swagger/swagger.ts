// the swagger autogen config file

import swaggerAutogen from "swagger-autogen";
import { ArticleDef } from "./ArticleDef";

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
    ArticleCreateParam: {
      title: "New Article",
      content: "This is a new article.",
      author: "Author Name",
      createdDate: "2022-01-01T00:00:00.000Z",
      publishedDate: "2022-01-01T00:00:00.000Z",
      updatedDate: "2022-01-01T00:00:00.000Z",
      tag: "Tag",
      like: 0,
      views: 0,
      summary: "Summary",
      status: "Status",
      comments: [
        {
          username: "Commenter",
          content: "This is a comment.",
          createdDate: "2022-01-01T00:00:00.000Z",
        },
      ],
    },
    ArticleCreate200: {
      code: 1,
      msg: "null",
      data: {
        _id: "65c1a9b4fba17f733db61663",
        title: "New Article",
        content: "This is a new article.",
        author: "Author Name",
        createdDate: "2022-01-01T00:00:00.000Z",
        publishedDate: "2022-01-01T00:00:00.000Z",
        updatedDate: "2022-01-01T00:00:00.000Z",
        tag: "Tag",
        like: 0,
        views: 0,
        summary: "Summary",
        status: "Status",
        comments: [
          {
            username: "Commenter",
            content: "This is a comment.",
            createdDate: "2022-01-01T00:00:00.000Z",
            _id: "65c1a9b4fba17f733db61664",
          },
        ],
        __v: 0,
      },
    },
    ArticleGet200: [
      {
        code: 1,
        msg: "null",
        data: {
          _id: "65c1a9b4fba17f733db61663",
          title: "New Article",
          content: "This is a new article.",
          author: "Author Name",
          createdDate: "2022-01-01T00:00:00.000Z",
          publishedDate: "2022-01-01T00:00:00.000Z",
          updatedDate: "2022-01-01T00:00:00.000Z",
          tag: "Tag",
          like: 0,
          views: 0,
          summary: "Summary",
          status: "Status",
          comments: [
            {
              username: "Commenter",
              content: "This is a comment.",
              createdDate: "2022-01-01T00:00:00.000Z",
              _id: "65c1a9b4fba17f733db61664",
            },
          ],
          __v: 0,
        },
      },
    ],
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
