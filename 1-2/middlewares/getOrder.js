import { Food } from "../models/food.js";
import { Invoice } from "../models/invoice.js";
import AppError from "../utils/AppError.js";

export default async function (req, res, next, orderId) {
  try {
    const order = await Invoice.findOne({
      where: { id: orderId },
      include: Food,
    });
    if (!order) {
      const ex = new AppError("Order not found", "fail", 404);
      return next(ex);
    }
    req.order = order;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}
