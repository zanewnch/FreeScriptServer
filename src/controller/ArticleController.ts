import { ArticleRepo } from "../model/ArticleRepo";
import express from "express";
import { Article, ArticleDocument } from "interface/ArticleInterface";
import { Result } from "../utils/Result";
export class ArticleController {
  // declaration
  private articleRepo: ArticleRepo;

  // constructor
  constructor() {
    this.articleRepo = new ArticleRepo();
  }

  public getSpecifiedArticle = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      res
        .status(200)
        .json(
          Result.successWithData(
            await this.articleRepo.getSpecifiedArticle(
              req.params.author.replace(/-/g, " "),
              req.params.title.replace(/-/g, " ")
            )
          )
        );
    } catch (e) {
      console.error(e);
      res.status(400).json(Result.error(e.message));
    }
  };

  public get = async (req: express.Request, res: express.Response) => {
    try {
      /* 
      express.js 在parse url的時候，會把query string 轉成string, 所以要用parseInt轉回數字
       */
      const pageNum = parseInt(req.query.pageNum as string);
      const pageSize = parseInt(req.query.pageSize as string);
      const result: ArticleDocument[] =
        await this.articleRepo.getPaginatedArticles(pageNum, pageSize);

      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      res.status(500).json(Result.error(e.message));
    }
  };

  public search = async (req: express.Request, res: express.Response) => {
    try {
      let titleResult: ArticleDocument[] = [];
      let authorResult: ArticleDocument[] = [];

      if (req.query.keyword) {
        titleResult = await this.articleRepo.getArticleByTitle(
          req.query["keyword"] as string
        );
        authorResult = await this.articleRepo.getArticleByAuthor(
          req.query["keyword"] as string
        );
      }

      return res
        .status(200)
        .json(Result.successWithData(titleResult.concat(authorResult)));
    } catch (e) {
      console.error(e);
      res.status(400).json(Result.error(e.message));
    }
  };

  public getAll = async (req: express.Request, res: express.Response) => {
    try {
      // invoke db get method
      const result: ArticleDocument[] = await this.articleRepo.getArticles();

      // response
      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      res.status(500).json(Result.error(e.message));
    }
  };

  public publish = async (req: express.Request, res: express.Response) => {
    try {
      /* 這邊有一個bug, 如果前端只傳3個properties, 雖然可以用Article接，但只會有這三個properties;
        如果要包含所有properties,
        要先create new instance */

      // instantiate
      const defaultArticle: Article = {
        title: null,
        content: null,
        author: null,
        createdDate: null,
        publishedDate: null,
        updatedDate: null,
        tag: null,
        like: null,
        views: null,
        summary: null,
        status: null,
        comments: null,
      };

      /* 
       这意味着 reqData 可以是一个包含 Article 类型的任何属性的对象，但所有的属性都是可选的。这对于处理 req.body 很有用，因为 req.body 可能只包含 Article 的部分属性。
       */
      const reqData: Partial<Article> = req.body["data"];

      console.log(reqData);

      /* 
        defaultArticle 是一个包含所有 Article 属性的对象，所有属性都被设置为 null。然后，我们使用展开运算符（...）将 req.body 中的数据合并到 defaultArticle 中，创建了一个新的 Article 对象 data。如果 req.body 中包含 Article 的某个属性，那么这个属性的值将覆盖 defaultArticle 中的 null 值。如果 req.body 中不包含 Article 的某个属性，那么 data 中这个属性的值将保持为 null。
         */
      // merge object
      const data: Article = { ...defaultArticle, ...reqData };
      console.log("data:");
      console.log(data);

      // invoke db create method
      const result: ArticleDocument = await this.articleRepo.create(data);

      console.log("result:");
      console.log(result);

      // response
      res.status(200).json(result);
    } catch (e) {
      // catch error
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  };

  public deleteWithoutContent = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const result = await this.articleRepo.deleteDataWithoutContent();
      console.log(result);
      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      console.log(e);
    }
  };

  public create = async (req: express.Request, res: express.Response) => {
    try {
      // instantiate Article
      const defaultArticle: Article = {
        title: null,
        content: null,
        author: null,
        createdDate: null,
        publishedDate: null,
        updatedDate: null,
        tag: null,
        like: null,
        views: null,
        summary: null,
        status: null,
        comments: null,
      };
      // get req data
      const reqData: Partial<Article> = req.body["data"];

      //merge
      const data: Article = { ...defaultArticle, ...reqData };

      // invoke db create method
      const result: ArticleDocument = await this.articleRepo.create(data);

      // response
      res.status(200).json(Result.successWithData(result));
    } catch (e) {
      // catch error
      console.log(e);
      res.status(500).json(Result.error(e.message));
    }
  };
}
