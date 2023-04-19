import { Food } from "../models/food.js";
import { Student } from "../models/student.js";
import { Invoice } from "../models/invoice.js";
import { InvoiceHaveFood } from "../models/invoiceHaveFood.js";
import { loadRelationship } from "./relationships.js";

const loadDatabase = async () => {
  await loadRelationship();
  await Food.sync({ alter: true });
  await Student.sync({ alter: true });
  await Invoice.sync({ alter: true });
  await InvoiceHaveFood.sync({ alter: true });
};

loadDatabase().catch((e) => {
  console.log(e);
  process.exit(1);
});
