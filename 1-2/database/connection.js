import { Sequelize } from "sequelize";

function DatabaseConnection() {
  this.sequelize = new Sequelize("hw18", "root", "11NIma22", {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging: false,
  });
  this.testConnection = async () => {
    try {
      await this.sequelize.authenticate();
      console.log("Database connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", e);
      process.exit(1);
    }
  };
  this.testConnection();
}

export const connection = new DatabaseConnection();
