import mongoose, { Model, Schema } from "mongoose";
import { UpdateResult } from "mongodb";
import {
  LocalUser,
  LocalUserDocument,
  GoogleUser,
  GoogleUserDocument,
  User,
  UserDocument,
} from "interface/UserInterface";

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
  localJWTToken: { type: String, required: false },
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

  public insertUser = async (
    user: LocalUser | GoogleUser
  ): Promise<UserDocument & { _id: mongoose.Types.ObjectId }> => {
    try {
      /* 既使傳的data沒有 createTime and updateTime, 還是可以成功insert
      前端傳什麼param, 就insert什麼param
      */
      const newUser: UserDocument & {
        _id: mongoose.Types.ObjectId;
      } = new this.model(user);
      return await newUser.save();
    } catch (e) {
      console.log(e);
    }
  };

  public getByLocalAccount = async (
    user: LocalUser
  ): Promise<LocalUserDocument | null> => {
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
    user: GoogleUser
  ): Promise<GoogleUserDocument | null> => {
    try {
      return await this.model.findOne({
        displayName: user["displayName"],
        providerId: user["providerId"],
      });
    } catch (e) {
      console.log(e);
    }
  };

  public updateUser = async (user: User): Promise<UserDocument & {
    _id: mongoose.Types.ObjectId;
  }> => {
    try {
      // Find the user
      const foundUser = await this.model.findOne({ username: user.username });

      if (!foundUser) {
        throw new Error("User not found");
      }

      // Update the user
      Object.keys(user).forEach((key) => {
        // @ts-ignore
        foundUser[key as any] = user[key];
      });

      const result: UserDocument & {
        _id: mongoose.Types.ObjectId;
      } = await foundUser.save();

      return result;

      // const result: UpdateResult = await this.model.updateOne(
      //   { username: user["username"] },
      //   { password: user["password"] }
      // );

      // if (result["matchedCount"] === 0) {
      //   console.log("No user found");
      // } else {
      //   console.log("update");
      // }

      // return result;
    } catch (e) {
      console.log(e);
    }
  };
}
