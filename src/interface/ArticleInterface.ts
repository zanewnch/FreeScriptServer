import { Document } from "mongoose";
export interface Article {
  /* 
    [key: string]：这部分表示你可以使用任意字符串作为索引。key 只是一个占位符，你可以用任何你喜欢的名字替换它。

    number | null：这部分表示索引的值可以是 number 类型或 null 类型。

    所以，[key: string]: number | null; 的整体含义是：你可以使用任意字符串作为索引来访问对象的属性，这些属性的值可以是 number 类型或 null 类型。
     */
  [key: string]: number | string | Date | object | boolean;
  title: string;
  content: string;
  author: string;
  createdDate: Date;
  publishedDate: Date;
  updatedDate: Date;
  tag: string;
  like: number;
  views: number;
  summary: string;
  status: string;
  comments: {
    username: string;
    content: string;
    createdDate: Date;
  }[];
}

export interface ArticleDocument extends Article, Document {};
