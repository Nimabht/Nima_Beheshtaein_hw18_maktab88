import { connection } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Food = connection.sequelize.define(
  "Food",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "Foods",
    timestamps: true,
  }
);
