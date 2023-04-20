import controllers from "../controllers/order.js";
import express from "express";
import asyncMiddleware from "../middlewares/async.js";
import getOrder from "../middlewares/getOrder.js";
const router = express.Router();

router.param("orderId", getOrder);
router.get("/", asyncMiddleware(controllers.getAllOrders));
router.get("/:orderId", asyncMiddleware(controllers.getOrderById));
router.post("/", asyncMiddleware(controllers.createOrder));
router.put("/:orderId", asyncMiddleware(controllers.updateOrder));
router.delete("/:orderId", asyncMiddleware(controllers.deleteOrder));
export default router;
