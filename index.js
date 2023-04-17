import db from "./database/connection.js";
import express from "express";

const app = express();

app.use(express.static("public"));
app.set("views", "./views");

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
