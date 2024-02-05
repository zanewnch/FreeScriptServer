import { use } from "echarts";
import mongoose from "mongoose";

/* 在 Mongoose 中，select 是一個模式选项（schema option），用于指定在查询时是否默认返回该字段。
当 select 设置为 false 时，使用如 find() 或 findOne() 等查询方法时，该字段默认不会被返回。如果你需要返回该字段，你需要明确地在查询中指定它，如 User.find().select('+password')。
这个选项通常用于敏感信息，如密码，你可能不希望在每次查询时都返回这些信息，但在某些特定情况下，你可能需要查询这些信息。 */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  registrationDate: { type: Date, required: true },
  lastLoginDate: { type: Date, required: true },
  userStatus: { type: String, required: true },
});

/* 
這行代碼在 Mongoose 中創建了一個名為 "User" 的模型。模型是基於模式定義的構造函數，用於創建和讀取 MongoDB 中的文檔。
mongoose.model("User", UserSchema); 這行代碼做了兩件事：
它創建了一個新的 Mongoose 模型，名為 "User"。這個名稱將用於在 MongoDB 數據庫中識別這種類型的文檔。
它將 UserSchema 與該模型關聯。這個模式定義了 "User" 文檔的結構，包括字段名、字段類型、驗證等。
然後，這個模型被導出，所以它可以在其他文件中被引入和使用，以進行數據庫操作，如創建新的 "User" 文檔，或查詢現有的 "User" 文檔。
*/
export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => {
  UserModel.find();
};
