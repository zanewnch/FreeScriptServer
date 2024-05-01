import mongoose, { Model, Schema } from "mongoose";
import { Article, ArticleDocument } from "../interface/ArticleInterface";
import { DeleteResult } from "mongodb";
// a collection is similar to table, and a document is similar to a row of data

/* 在 Mongoose 中，select 是一個模式选项（schema option），用于指定在查询时是否默认返回该字段。

当 select 设置为 false 时，使用如 find() 或 findOne() 等查询方法时，该字段默认不会被返回。如果你需要返回该字段，你需要明确地在查询中指定它，如 User.find().select('+password')。
这个选项通常用于敏感信息，如密码，你可能不希望在每次查询时都返回这些信息，但在某些特定情况下，你可能需要查询这些信息。 */
const ArticleSchema: Schema = new Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  author: { type: String, required: false },
  createdDate: { type: Date, required: false },
  publishedDate: { type: Date, required: false },
  updatedDate: { type: Date, required: false },
  tag: { type: String, required: false },
  like: { type: Number, required: false },
  views: { type: Number, required: false },
  summary: { type: String, required: false },
  // draft, published
  status: { type: String, required: false },
  comments: [
    {
      username: { type: String, required: false },
      content: { type: String, required: false },
      createdDate: { type: Date, required: false, default: Date.now },
    },
  ],
});

export class ArticleRepo {
  private model: Model<ArticleDocument>;
  constructor() {
    // Build collection in mongodb
    this.model = mongoose.model<ArticleDocument>("Article", ArticleSchema);
  }

  public getSpecificTagsArticles = async (
    tags: string
  ): Promise<
    | (ArticleDocument & {
        _id: mongoose.Types.ObjectId;
      })[]
    | []
  > => {
    try {
      return await this.model.find({ tag: tags }).exec();
    } catch (e) {
      console.log(e);
    }
  };

  public getTags = async (): Promise<any[] | null> => {
    try {
      return await this.model
        .aggregate([{ $group: { _id: "$tag" } }, { $sample: { size: 5 } }])
        .exec();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  public deleteDataWithoutContent = (): Promise<DeleteResult | null> => {
    /* 
    deleteMany 方法的參數是一個物件 { content: { $exists: false } }。這個物件定義了刪除文檔的條件：所有 content 屬性不存在的文檔都將被刪除。
    所以，這段程式碼的意思是：刪除所有 content 屬性不存在的文檔。

    在你的代码中，.deleteMany({ content: { $exists: false } }) 创建了一个表示删除操作的查询，但这个查询在被创建时并不会立即执行。你需要调用 .exec() 方法来执行这个查询。

当你调用 .exec() 后，Mongoose 将会向 MongoDB 发送一个删除命令，然后返回一个 Promise。这个 Promise 将会在删除操作完成后解析为操作的结果。

所以，.exec() 的作用是执行查询并返回一个 Promise。
    */
    return this.model
      .deleteMany({ content: { $exists: false } })
      .exec()
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        return null;
      });
  };

  public getPaginatedArticles = async (
    pageNum: number,
    pageSize: number
  ): Promise<ArticleDocument[] | []> => {
    try {
      return this.model
        .find({})
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .exec();
    } catch (e) {
      console.log(e);
    }
  };

  public getSpecifiedArticle = async (
    author: string,
    title: string
  ): Promise<ArticleDocument[] | []> => {
    try {
      const regexAuthor: RegExp = new RegExp(author, "i");
      const regexTitle: RegExp = new RegExp(title, "i");
      return await this.model
        .find({
          author: { $regex: regexAuthor },
          title: { $regex: regexTitle },
        })
        .exec();
    } catch (e) {
      console.error(e.message);
    }
  };

  public getArticleByTitle = async (
    title: string
  ): Promise<ArticleDocument[] | []> => {
    try {
      // i is the modifier of regular expression for case-insensitive
      const regex = new RegExp(title, "i");
      return await this.model.find({ title: { $regex: regex } }).exec();
    } catch (e) {
      console.log(e);
    }
  };

  public getArticleByAuthor = async (
    author: string
  ): Promise<ArticleDocument[] | []> => {
    try {
      // using the regular expression to wildcard search
      // "i" mean case-insensitive
      const regex = new RegExp(author, "i");
      return await this.model.find({ author: { $regex: regex } }).exec();
    } catch (e) {
      console.log(e);
    }
  };
  // get all articles
  public getArticles = async (): Promise<ArticleDocument[] | []> => {
    try {
      return this.model.find().exec();
    } catch (e) {
      console.log(e);
    }
  };

  public getStaffPicks = async (): Promise<any[] | [] | null> => {
    try {
      return await this.model
        .aggregate([
          { $match: { views: { $gt: 500 } } },
          { $sample: { size: 3 } },
        ])
        .exec();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * Normal create method, just send the Article to this method
   * @param article
   * @returns ArticleDocument
   */
  public create = async (article: Article): Promise<ArticleDocument | null> => {
    try {
      for (let key in article) {
        if (article[key] === null) {
          delete article[key];
        }
      }

      const result: ArticleDocument = await this.model.create(article);
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
}
