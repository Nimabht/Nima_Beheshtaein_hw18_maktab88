import db from "./database/connection.js";
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import user from "./routes/user.js";
import session from "express-session";
const app = express();

app.use(express.static("public"));
app.set("views", "./views");
app.use(express.json());
app.use(
  session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
  })
);

app.use("/api/user", user);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
