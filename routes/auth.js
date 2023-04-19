import express from "express";
import controllers from "../controllers/auth.js";
import asyncMiddleware from "../middlewares/async.js";
import checkSessionId from "../middlewares/checkSessionId.js";
const router = express.Router();

router.post("/login", asyncMiddleware(controllers.loginUser));
router.get(
  "/logout",
  checkSessionId,
  asyncMiddleware(controllers.logoutUser)
);
router.post(
  "/resetpassword",
  asyncMiddleware(controllers.resetPassword)
);
export default router;
