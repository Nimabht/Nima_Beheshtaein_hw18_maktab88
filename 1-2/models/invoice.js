import { connection } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Invoice = connection.sequelize.define(
  "Invoice",
  {
    transactionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [12, 12],
      },
    },
  },
  {
    tableName: "Invoices",
    timestamps: true,
  }
);
