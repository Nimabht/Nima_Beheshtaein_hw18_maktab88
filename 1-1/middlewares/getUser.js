import { User } from "../models/user.js";
import AppError from "../utils/AppError.js";
import isValidObjectId from "../validators/ObjectId.js";

export default async function (req, res, next, userId) {
  try {
    if (!isValidObjectId(userId)) {
      const ex = new AppError("Invalid Id", "fail", 400);
      return next(ex);
    }
    const user = await User.findById(userId).select("-__v -password");
    if (!user) {
      const ex = new AppError("User not found", "fail", 404);
      return next(ex);
    }
    req.user = user;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}
