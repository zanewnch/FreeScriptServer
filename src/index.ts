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
import socketio from "socket.io";

const app = express();

// set static folder
// __dirname is the current directory of the file, which mean src in this case
/* 
the express.js would auto add index.html in folder to the root route;
which mean the localhost:8080/ would show the index.html 
 */
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// swagger related cofig
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(compression());
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.json());
// This is a built-in middleware function in Express that does the same job as bodyParser.json().
app.use(express.json());
app.use("/", router());

// const MONGO_URL = ''; // DB URI

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => console.log(error));
const MONGO_URL: string =
  "mongodb+srv://zanewnch:zanewnch@sideproject.1lukwic.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket:any) => {
  console.log("New WS Connection...");
  // socket.emit("message", "Welcome to the chat");

  // socket.broadcast.emit("message", "A user has joined the chat");

  // socket.on("disconnect", () => {
  //   io.emit("message", "A user has left the chat");
  // });

  // socket.on("chatMessage", (msg) => {
  //   io.emit("message", msg);
  // });
});

// not using app.listen()
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
