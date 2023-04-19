import { connection } from "../database/connection.js";
import { DataTypes } from "sequelize";
import { Invoice } from "../models/invoice.js";
import { Food } from "../models/food.js";

export const InvoiceHaveFood = connection.sequelize.define(
  "InvoiceHaveFood",
  {
    InvoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Invoice,
        key: "id",
      },
    },
    FoodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Food,
        key: "id",
      },
    },
  },
  {
    tableName: "InvoiceHaveFood",
  }
);
