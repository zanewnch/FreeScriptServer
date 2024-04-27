import { Document } from 'mongoose';

/* 
在這個 User interface 中，所有的屬性都是可選的，這與你的 userSchema 中所有的 required 屬性都被設置為 false 是一致的。? 符號表示該屬性是可選的，也就是說，一個 User 對象可以不包含這個屬性。
*/

export interface LocalUser{
  createTime?: Date;
    loginTime?: Date;
    username?:string;
    password?:string;
}

export interface GoogleUser{
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

export interface User{
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
    username?:string;
    password?:string;
}
export interface UserDocument extends User,Document{};
/* 
在這個修改版本中，localUserDocument 接口擴展了 localUser 和 Document 兩個接口，並且沒有自己的額外屬性，所以它的主體是空的 {}。
*/
/* 
在 Mongoose 中，Document 是所有 MongoDB 文档的基类。它包含了许多用于操作 MongoDB 文档的方法和属性，例如 save、remove、validate 等。

当你创建一个 Mongoose 模型时，你通常会定义一个接口来表示文档的结构。然后，你可以将这个接口与 Document 接口进行扩展，以便你的文档可以使用 Document 提供的方法和属性。

在你的代码中，UserDocument 接口扩展了 User 和 Document。这意味着一个 UserDocument 不仅有 User 接口定义的属性，还有 Document 提供的方法和属性。这使得你可以在一个 UserDocument 上调用例如 save 或 remove 这样的方法。
*/
export interface LocalUserDocument extends LocalUser,Document{};
export interface GoogleUserDocument extends GoogleUser,Document{};


