import { Document } from "mongoose";

/* 
在這個 User interface 中，所有的屬性都是可選的，這與你的 userSchema 中所有的 required 屬性都被設置為 false 是一致的。? 符號表示該屬性是可選的，也就是說，一個 User 對象可以不包含這個屬性。
*/
/* 
在 TypeScript 中，如果你在接口中定義了一個屬性，但沒有加 ?，那麼這個屬性就是必需的。如果你嘗試將一個沒有這個屬性的物件賦值給這個接口的類型，TypeScript 編譯器會報錯。

然而，這只是在編譯時期。在運行時期，JavaScript 不會檢查物件的屬性是否符合接口的定義。所以，如果你的服務器在運行時接收到一個請求體，並且請求體沒有某個必需的屬性，那麼服務器不會報錯。但是，當你在處理請求體時，如果你嘗試訪問一個不存在的屬性，那麼可能會出現問題。

為了避免這種情況，你應該在處理請求體之前驗證它的結構。你可以使用一個驗證庫（如 Joi 或 express-validator）來確保請求體有所有必需的屬性，並且這些屬性的值是正確的類型。如果請求體不符合你的期望，那麼你可以返回一個錯誤響應，告訴客戶端他們需要提供更多的資訊。
*/

export interface LocalUser {
  createTime?: Date;
  loginTime?: Date;
  username?: string;
  password?: string;
}

export interface GoogleUser {
  JWTToken?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
  localAccount?: string;
  localPassword?: string;
  role?: string;
  createTime?: Date;
  loginTime?: Date;
}

/* 
如果你在接口中添加了 [key: string]: any;，那麼這個接口的物件可以有任何名稱的屬性，並且這些屬性的值可以是任何類型。這意味著 TypeScript 編譯器將不會檢查這些屬性的存在性或它們的值的類型。

然而，列出具體的屬性仍然有其價值。首先，它們提供了文檔，讓其他開發者知道你期望這個物件有哪些屬性。其次，即使你有一個索引簽名，TypeScript 仍然會檢查具體的屬性。例如，如果你嘗試將一個 string 賦值給 createTime，TypeScript 會報錯，因為 createTime 的類型應該是 Date。

所以，即使你有一個索引簽名，列出具體的屬性仍然是有意義的。然而，如果你不希望 TypeScript 檢查這些屬性的存在性或它們的值的類型，那麼你可以只使用索引簽名。
*/
export interface User {
  [key: string]: any;
  JWTToken?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
  localAccount?: string;
  localPassword?: string;
  role?: string;
  createTime?: Date;
  loginTime?: Date;
  username?: string;
  password?: string;
}
export interface UserDocument extends User, Document {}
/* 
在這個修改版本中，localUserDocument 接口擴展了 localUser 和 Document 兩個接口，並且沒有自己的額外屬性，所以它的主體是空的 {}。
*/
/* 
在 Mongoose 中，Document 是所有 MongoDB 文档的基类。它包含了许多用于操作 MongoDB 文档的方法和属性，例如 save、remove、validate 等。

当你创建一个 Mongoose 模型时，你通常会定义一个接口来表示文档的结构。然后，你可以将这个接口与 Document 接口进行扩展，以便你的文档可以使用 Document 提供的方法和属性。

在你的代码中，UserDocument 接口扩展了 User 和 Document。这意味着一个 UserDocument 不仅有 User 接口定义的属性，还有 Document 提供的方法和属性。这使得你可以在一个 UserDocument 上调用例如 save 或 remove 这样的方法。
*/
export interface LocalUserDocument extends LocalUser, Document {}
export interface GoogleUserDocument extends GoogleUser, Document {}
