import controllers from "../controllers/student.js";
import express from "express";
import asyncMiddleware from "../middlewares/async.js";
import getStudent from "../middlewares/getStudent.js";
const router = express.Router();

router.param("studentId", getStudent);
router.get("/", asyncMiddleware(controllers.getAllStudents));
router.get("/:studentId", asyncMiddleware(controllers.getStudentById));
router.post("/", asyncMiddleware(controllers.createStudent));
router.put("/:studentId", asyncMiddleware(controllers.updateStudent));
router.delete("/:studentId", asyncMiddleware(controllers.deleteStudent));
export default router;
