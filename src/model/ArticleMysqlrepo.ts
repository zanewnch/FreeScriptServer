import { Knex } from "./Knex";
import { Article, ArticleDocument } from "interface/ArticleInterface";

export class ArticleMysqlRepo {
  private knex: Knex;

  constructor() {
    this.knex = new Knex();
  }
  public async getArticlesByPagination(
    pageNum: number,
    pageSize: number
  ): Promise<Article[]> {
    const offset = (pageNum - 1) * pageSize;
    const articles = await this.knex.db
      .select("*")
      .from("articles")
      .limit(pageSize)
      .offset(offset);
    return articles;
  }

  public async insert(article: Article): Promise<void> {
    await this.knex.db("articles").insert({
      title: article.title,
      content: article.content,
      author: article.author,
      createdDate: article.createdDate,
      publishedDate: article.publishedDate,
      updatedDate: article.updatedDate,
      tag: article.tag,
      like: article.like,
      views: article.views,
      summary: article.summary,
      status: article.status,
      comments: JSON.stringify(article.comments),
    });
  }
}
