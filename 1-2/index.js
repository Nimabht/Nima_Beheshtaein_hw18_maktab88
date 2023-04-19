import "./database/load.js";
import express from "express";
import student from "./routes/student.js";
import food from "./routes/food.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/student", student);
app.use("/api/food", food);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
