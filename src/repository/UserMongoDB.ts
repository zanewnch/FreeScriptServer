import mongoose, { Document, Model, Schema } from "mongoose";

// a collection is similar to table, and a document is similar to a row of data

// define the structure of the user object
interface IUser {
  username: string;
  password: string;
  registrationDate: Date;
  lastLoginDate: Date;
  userStatus: string;
}
// extends the mongoose Document interface
interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {
  getUsers(): Promise<IUserDocument[]>;
}
/* 在 Mongoose 中，select 是一個模式选项（schema option），用于指定在查询时是否默认返回该字段。

当 select 设置为 false 时，使用如 find() 或 findOne() 等查询方法时，该字段默认不会被返回。如果你需要返回该字段，你需要明确地在查询中指定它，如 User.find().select('+password')。
这个选项通常用于敏感信息，如密码，你可能不希望在每次查询时都返回这些信息，但在某些特定情况下，你可能需要查询这些信息。 */
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  registrationDate: { type: Date, required: true },
  lastLoginDate: { type: Date, required: true },
  userStatus: { type: String, required: true },
});



UserSchema.statics.getUsers = function (): Promise<IUserDocument[]> {
  console.log("getUsers");
  return this.find().exec();
};

export class UserMongoDB {
  private model: IUserModel;

  constructor() {
    // create a model from the schema
    this.model = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
  }

  public async createUser(user:any) {
    try {
      const result = await this.model.create({
        username: user['username'],
        password: user['password'],
        registrationDate: user['registrationDate'],
        lastLoginDate: user['lastLoginDate'],
        userStatus: user['userStatus']
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  public getUsers() {
    return this.model.getUsers();
  }
};

