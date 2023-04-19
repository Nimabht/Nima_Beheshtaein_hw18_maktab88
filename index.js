import db from "./database/connection.js";
import express from "express";
import cookieParser from "cookie-parser";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import user from "./routes/user.js";
import index from "./routes/index.js";
import session from "express-session";
import auth from "./routes/auth.js";
const MongoDBStore = connectMongoDBSession(session);

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/HW18",
  collection: "sessions",
});

console.log("AM i good?");

const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    store: store,
  })
);

app.use("/api/user", user);
app.use("/auth", auth);
app.use("/", index);
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});

export { store };
