import { Document } from 'mongoose';

/* 
在這個 User interface 中，所有的屬性都是可選的，這與你的 userSchema 中所有的 required 屬性都被設置為 false 是一致的。? 符號表示該屬性是可選的，也就是說，一個 User 對象可以不包含這個屬性。
*/

export interface User {
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

export interface UserDocument extends User, Document {};