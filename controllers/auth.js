import { User } from "../models/user.js";
import AppError from "../utils/AppError.js";
import session from "express-session";
import bcrypt from "bcrypt";
import validators from "../validators/user.js";
export default {
  loginUser: async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      const ex = new AppError(
        "Invalid username or password",
        "fail",
        401
      );
      return next(ex);
    }
    if (!(await user.validatePassword(password))) {
      const ex = new AppError(
        "Invalid username or password",
        "fail",
        401
      );
      return next(ex);
    }
    req.session.user = { username: user.username, _id: user._id };
    res.status(202).end();
  },
  logoutUser: (req, res, next) => {
    req.session.destroy();
    res.status(200).end();
  },
  resetPassword: async (req, res, next) => {
    const { error } = validators.validateResetPassword(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const { currentPassword, newPassword, repeatPassword } = req.body;
    const user = await User.findById(req.session.user._id);
    if (!user) {
      const ex = new AppError("Unauthorized request", "fail", 401);
      return next(ex);
    }
    if (!(await user.validatePassword(currentPassword))) {
      const ex = new AppError("Unauthorized request", "fail", 401);
      return next(ex);
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).end();
  },
};
