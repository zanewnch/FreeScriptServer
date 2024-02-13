import mongoose, { Document, Model, Schema } from "mongoose";
import { Article, ArticleDocument } from "../interface/ArticleInterface";
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

  public getPaginatedArticles = async(pageNum:number,pageSize:number):Promise<void>=>{
    
    try{
      this.model
      .find({})
      .skip((pageNum-1)*pageSize)
      .limit(pageSize)
      .exec((err,documents)=>{
        if(err){
          console.log(err);
        }else{
          console.log(documents);
        }
      
      })
    }catch(e){
      console.log(e);
    }
  }

  public getArticles = async (): Promise<ArticleDocument[]> => {
    try {
      return this.model.find().exec();
    } catch (e) {
      throw e;
    }
  };

  /**
   * Normal create method, just send the Article to this method
   * @param article
   * @returns ArticleDocument
   */
  public create = async (article: Article): Promise<ArticleDocument> => {
    console.log("article");
    console.log(article);

    for (let key in article) {
      if (article[key] === null) {
        delete article[key];
      }
    }

    console.log("article");
    console.log(article);

    const result: ArticleDocument = await this.model.create(article);
    return result;
  };
}
