import { User } from "../models/user.js";
import AppError from "../utils/AppError.js";
import session from "express-session";

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
};
