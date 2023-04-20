import { Student } from "../models/student.js";
import AppError from "../utils/AppError.js";
import { Op } from "sequelize";
import validateStudent from "../validators/student.js";
export default {
  getAllStudents: async (req, res, next) => {
    const students = await Student.findAll();
    res.send(students);
  },
  getStudentById: async (req, res, next) => {
    res.send(req.student);
  },
  createStudent: async (req, res, next) => {
    const { error, value } = validateStudent(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    let student = await Student.findOne({
      where: { studentCode: value.studentCode },
    });
    if (!!student) {
      const ex = new AppError("Use another studentCode", "fail", 400);
      return next(ex);
    }
    student = await Student.create(value);
    res.status(201).send(student);
  },
  updateStudent: async (req, res, next) => {
    const { error, value } = validateStudent(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if studentCode already exists in database
    let existingStudent = await Student.findOne({
      where: {
        studentCode: value.studentCode,
        id: { [Op.ne]: req.student.id },
      },
    });
    if (!!existingStudent) {
      const ex = new AppError(
        "Use another studentCode.",
        "fail",
        400
      );
      return next(ex);
    }
    await Student.update(value, {
      where: { id: req.student.id },
    });
    const updatedUser = await Student.findOne({
      where: { id: req.student.id },
    });
    res.status(200).send(updatedUser);
  },
  deleteStudent: async (req, res, next) => {
    const id = req.student.id;
    await Student.destroy({ where: { id } });
    res.status(204).end();
  },
};
