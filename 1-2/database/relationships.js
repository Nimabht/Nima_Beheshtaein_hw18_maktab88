import { Food } from "../models/food.js";
import { Student } from "../models/student.js";
import { Invoice } from "../models/invoice.js";
import { InvoiceHaveFood } from "../models/invoiceHaveFood.js";
export const loadRelationship = async () => {
  await Student.hasMany(Invoice);
  await Invoice.belongsTo(Student);
  await Food.belongsToMany(Invoice, { through: InvoiceHaveFood });
  await Invoice.belongsToMany(Food, { through: InvoiceHaveFood });
};
