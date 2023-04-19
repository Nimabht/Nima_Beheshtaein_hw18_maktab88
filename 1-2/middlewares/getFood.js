import { Food } from "../models/food.js";
import AppError from "../utils/AppError.js";
export default async function (req, res, next, foodId) {
  try {
    const food = await Food.findOne({ where: { id: foodId } });
    if (!food) {
      const ex = new AppError("Food not found", "fail", 404);
      return next(ex);
    }
    req.food = food;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}
