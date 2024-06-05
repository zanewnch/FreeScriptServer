import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "./swagger/swagger_output.json";
import path from "path";

import "dotenv/config";

// 可以用 app.use 來做global authentication, 就是連線到任何route 的時候 都會先run app.use

// use dotenv to load the .env file
// this code would load the .env file and set the environment variable
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();

/*
set static folder.

__dirname is the current directory of the file, which mean src in this case

the express.js would auto add index.html in folder to the root route;
which mean the localhost:8080/ would show the index.html 
 */
app.use(express.static(path.join(__dirname, "public")));



// 设置 Express 使用 EJS 模板引擎
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// cors config for localhost
app.use(
  cors({
    origin: ["http://58.115.128.46:5173","http://localhost:5173"],
    // origin:'*',
    // origin: function (origin, callback) {
    //   callback(null, origin);
    // },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

//cors config 舊版
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", "true");
//   // 其他的 CORS 相關設置
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // 或者你的前端應用的 URL
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

// swagger related cofig
// 這裡的path就是swagger ui path
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// normal setting
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use("/", router());

// mongoose config
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});
mongoose.connection.on("error", (error: Error) => console.log(error));

const port = process.env.PORT || 8080;

const server = http.createServer(app);

// not using app.listen()
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
