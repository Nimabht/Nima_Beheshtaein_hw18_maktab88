import { connection } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Student = connection.sequelize.define(
  "Student",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["man", "woman"]],
      },
    },
    studentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [9, 9],
        not: /^0/,
      },
    },
  },
  {
    tableName: "Students",
    timestamps: true,
  }
);
