import express from "express";
import controllers from "../controllers/auth.js";
import asyncMiddleware from "../middlewares/async.js";
const router = express.Router();

router.post("/login", asyncMiddleware(controllers.loginUser));

export default router;
