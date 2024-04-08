import mongoose, { Model, Schema } from "mongoose";
import { UserDocument, User } from "interface/UserInterface";

const userSchema: Schema = new Schema({
  JWTToken: { type: String, required: false },
  email: { type: String, required: false },
  displayName: { type: String, required: false },
  photoURL: { type: String, required: false },
  providerId: { type: String, required: false },
  localAccount: { type: String, required: false },
  localPassword: { type: String, required: false },
  role: { type: String, required: false },
  createTime: { type: Date, required: false },
  loginTime: { type: Date, required: false },
  username: { type: String, required: false },
  password: { type: String, required: false },
});

export class UserRepo {
  private model: Model<UserDocument>;

  constructor() {
    this.model = mongoose.model<UserDocument>("Users", userSchema);
  }

  public getPaginatedUsers = async (
    pageNum: number,
    pageSize: number
  ): Promise<UserDocument[]> => {
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

  public insertUser = async (user: User): Promise<UserDocument> => {
    try {
      const newUser = new this.model(user);
      return newUser.save();
    } catch (e) {
      console.log(e);
    }
  };

  public getByLocalAccount = async (
    user: User
  ): Promise<UserDocument[] | [] | void> => {
    try {
      return await this.model.findOne({
        username: user["username"],
        password: user["password"],
      });
    } catch (e) {
      console.log(e);
    }
  };

  public getGoogleAccount = async (
    user: User
  ): Promise<UserDocument[] | [] | void> => {
    try {
      return await this.model.findOne({
        username: user["displayName"],
        password: user["providerId"],
      });
    } catch (e) {
      console.log(e);
    }
  };
}
