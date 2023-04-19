import { Student } from "../models/student.js";
import AppError from "../utils/AppError.js";
export default async function (req, res, next, userId) {
  try {
    const student = await Student.findOne({ where: { id: userId } });
    if (!student) {
      const ex = new AppError("Student not found", "fail", 404);
      return next(ex);
    }
    req.student = student;
    next();
  } catch (error) {
    const ex = new AppError(error.message, "error", 500);
    return next(ex);
  }
}
