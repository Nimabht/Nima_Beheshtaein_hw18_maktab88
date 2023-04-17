import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    uniqe: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
});

userSchema.methods.validatePassword = async function validatePassword(
  password
) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
