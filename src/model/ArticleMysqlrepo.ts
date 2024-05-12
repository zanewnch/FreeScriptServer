import { Knex } from "./Knex";
import { Article, ArticleDocument } from "interface/ArticleInterface";

export class ArticleMysqlrepo {
    private knex: Knex;

    constructor() {
        this.knex = new Knex();
    }
}