import { User } from "./../models/user.js";
import validators from "../validators/user.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import session from "express-session";
export default {
  createUser: async (req, res, next) => {
    const { error, value } = validators.validateUserForSignup(
      req.body
    );
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }

    let user = await User.findOne({ username: value.username });
    if (!!user) {
      const ex = new AppError("Use another username", "fail", 400);
      return next(ex);
    }

    const { firstname, lastname, username, password, gender, role } =
      value;
    user = new User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      gender: gender,
      role: role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const filteredUser = { ...user.toObject() };
    delete filteredUser.password;
    delete filteredUser.registrationDate;
    delete filteredUser.updatedAt;
    delete filteredUser.__v;
    res.status(201).send(filteredUser);
  },
  getUserById: (req, res, next) => {
    res.send(req.user);
  },
  updateUser: async (req, res, next) => {
    const { error, value } = validators.validateUserForUpdate(
      req.body
    );
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if username already exists in database
    let existingUser = await User.findOne({
      username: value.username,
      _id: { $ne: req.user._id }, // exclude user with specified id
    });
    if (existingUser) {
      const ex = new AppError("Use another username.", "fail", 400);
      return next(ex);
    }
    const { firstname, lastname, username, gender, role } = value;
    const user = req.user;
    user.set({
      firstname: firstname,
      lastname: lastname,
      username: username,
      gender: gender,
      role: role,
    });
    await user.save();
    const filteredUser = { ...user.toObject() };
    delete filteredUser.password;
    delete filteredUser.registrationDate;
    delete filteredUser.updatedAt;
    delete filteredUser.__v;
    res.status(200).send(filteredUser);
  },
  deleteUser: async (req, res, next) => {
    await req.user.deleteOne();
    res.status(204).end();
  },
};
