import controllers from "../controllers/food.js";
import express from "express";
import asyncMiddleware from "../middlewares/async.js";
import getFood from "../middlewares/getFood.js";
const router = express.Router();

router.param("foodId", getFood);
router.get("/", asyncMiddleware(controllers.getAllFoods));
router.get("/:foodId", asyncMiddleware(controllers.getFoodById));
router.post("/", asyncMiddleware(controllers.createFood));
router.put("/:foodId", asyncMiddleware(controllers.updateFood));
router.delete("/:foodId", asyncMiddleware(controllers.deleteFood));
export default router;
