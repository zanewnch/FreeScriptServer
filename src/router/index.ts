import express from "express";
import User from "../deprecated/UserRouter";

import SupermarketSale from "./SupermarketSaleRouter";
import ArticleRouter from "./ArticleRouter";
import UserNoSQL from "./UserRouter";

const router = express.Router();

/* 
這段程式碼中的函數是一個匿名函數，並且被設定為模組的預設導出（default export）。在 JavaScript 和 TypeScript 中，函數可以是具名的，也可以是匿名的。匿名函數就是沒有名稱的函數。

在這個例子中，匿名函數被導出，所以在導入這個模組的地方，你可以自由地給這個函數一個名稱。例如，如果這個模組的檔案名稱是 router.ts，你可以這樣導入和使用它：

在這裡，createRouter 就是你給這個匿名函數的名稱。你也可以給它任何其他的名稱。
*/
// export default  (): express.Router => {
//   // User(router);
//   UserNoSQL(router);
//   SupermarketSale(router);
//   ArticleRouter(router);

//   return router;
// };


const expressRouter = () : express.Router =>{
  UserNoSQL(router);
  SupermarketSale(router);
  ArticleRouter(router);
  return router;
}

export default expressRouter;