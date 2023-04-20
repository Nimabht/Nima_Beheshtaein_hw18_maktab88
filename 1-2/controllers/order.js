import { Op } from "sequelize";
import { Food } from "../models/food.js";
import { Student } from "../models/student.js";
import { Invoice } from "../models/invoice.js";
import { InvoiceHaveFood } from "../models/invoiceHaveFood.js";
import AppError from "../utils/AppError.js";
import validateOrder from "../validators/order.js";

export default {
  getAllOrders: async (req, res, next) => {
    const orders = await Invoice.findAll({
      include: {
        model: Food,
      },
    });
    res.send(orders);
  },
  getOrderById: async (req, res, next) => {
    res.send(req.order);
  },
  createOrder: async (req, res, next) => {
    const { error, value } = validateOrder(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const existingInvoice = await Invoice.findOne({
      where: { transactionCode: value.transactionCode },
    });
    if (!!existingInvoice) {
      const ex = new AppError(
        "Use another transaction code",
        "fail",
        400
      );
      return next(ex);
    }
    const studentId = value.studentId;
    const foodIds = value.foodIds;
    const isValidStudentId = await Student.findOne({
      where: { id: studentId },
    });
    if (!isValidStudentId) {
      const ex = new AppError("Student doesn't exists.", "fail", 400);
      return next(ex);
    }
    for (let i = 0; i < foodIds.length; i++) {
      const food = await Food.findOne({ where: { id: foodIds[i] } });
      if (!food) {
        const ex = new AppError("Invalid food ids.", "fail", 400);
        return next(ex);
      }
    }
    const invoice = await Invoice.create({
      transactionCode: value.transactionCode,
      StudentId: studentId,
    });
    for (let i = 0; i < foodIds.length; i++) {
      await InvoiceHaveFood.create({
        InvoiceId: invoice.id,
        FoodId: foodIds[i],
      });
    }
    res.status(201).send(invoice);
  },
  updateOrder: async (req, res, next) => {
    const { error, value } = validateOrder(req.body);
    const orderId = req.order.id;
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if studentCode already exists in database
    let existingOrder = await Invoice.findOne({
      where: {
        transactionCode: value.transactionCode,
        id: { [Op.ne]: orderId },
      },
    });
    if (!!existingOrder) {
      const ex = new AppError(
        "Use another transaction code.",
        "fail",
        400
      );
      return next(ex);
    }
    const studentId = value.studentId;
    const foodIds = value.foodIds;
    const isValidStudentId = await Student.findOne({
      where: { id: studentId },
    });
    if (!isValidStudentId) {
      const ex = new AppError("Student doesn't exists.", "fail", 400);
      return next(ex);
    }
    for (let i = 0; i < foodIds.length; i++) {
      const food = await Food.findOne({ where: { id: foodIds[i] } });
      if (!food) {
        const ex = new AppError("Invalid food ids.", "fail", 400);
        return next(ex);
      }
    }
    await Invoice.update(
      {
        transactionCode: value.transactionCode,
        StudentId: studentId,
      },
      {
        where: { id: orderId },
      }
    );
    await InvoiceHaveFood.destroy({
      where: { InvoiceId: orderId },
    });
    for (let i = 0; i < foodIds.length; i++) {
      await InvoiceHaveFood.create({
        InvoiceId: orderId,
        FoodId: foodIds[i],
      });
    }
    const updatedOrder = await Invoice.findOne({
      where: { id: orderId },
    });
    res.status(200).send(updatedOrder);
  },
  deleteOrder: async (req, res, next) => {
    const orderId = req.order.id;
    await InvoiceHaveFood.destroy({ where: { InvoiceId: orderId } });
    await Invoice.destroy({ where: { id: orderId } });
    res.status(204).end();
  },
};
