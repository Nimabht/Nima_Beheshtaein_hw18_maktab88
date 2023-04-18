import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import checkSessionId from "../middlewares/checkSessionId.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.get("/signup", (req, res, next) => {
  if (req.session && req.session.user) {
    // if the user is logged in, redirect to the dashboard
    return res.redirect("/dashboard");
  }
  const filePath = join(__dirname, "../views", "signup.html");
  res.sendFile(filePath);
});

router.get("/login", (req, res, next) => {
  if (req.session && req.session.user) {
    // if the user is logged in, redirect to the dashboard
    return res.redirect("/dashboard");
  }
  const filePath = join(__dirname, "../views", "login.html");
  res.sendFile(filePath);
});

router.get("/dashboard", checkSessionId, (req, res, next) => {
  const filePath = join(__dirname, "../views", "dashboard.html");
  res.sendFile(filePath);
});

export default router;
