import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

// TODO : test
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(compression());
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.json());
// This is a built-in middleware function in Express that does the same job as bodyParser.json().
app.use(express.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

// const MONGO_URL = ''; // DB URI

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => console.log(error));

app.use("/", router());
