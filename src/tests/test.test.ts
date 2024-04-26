import request from "supertest";
import express, { Express } from "express";
import router from "../router"; // 你的 UserRouter 模組
const app = express();
/* 
app.use(router);：這行代碼將 router 中間件添加到應用中，而不指定任何前綴路徑。這意味著 router 中定義的所有路由都將直接添加到應用中。例如，如果 router 定義了一個 /test 路由，那麼你可以通過 /test 訪問這個路由。

app.use("/", router());：這行代碼將 router() 函數返回的路由器添加到應用中，並指定了一個前綴路徑 /。在這種情況下，前綴路徑實際上並沒有改變路由的行為，因為 / 是所有路由的默認前綴。所以，這行代碼的行為與 app.use(router()); 基本相同。

請注意，router 和 router() 可能不是同一個東西。router 是一個已經存在的路由器實例，而 router() 是一個函數調用，它可能返回一個新的路由器實例。你需要確保你知道這兩個表達式的確切含義，並根據你的需求選擇使用哪一個。
*/
// app.use(router);
app.use("/", router());

describe("GET /api/test/test", () => {
  it('should respond with a 200 status code and the string "123"', async () => {
    const response = await request(app).get("/api/test/test");

    expect(response.status).toBe(200);
    expect(response.text).toBe("123");
  }, 5000); // 10 seconds
});
