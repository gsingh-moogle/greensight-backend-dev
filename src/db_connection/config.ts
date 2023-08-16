import * as dotenv from 'dotenv';
import { Options } from "sequelize";
dotenv.config(); // Load environment variables from .env file

export const dbConfig: Options = {
    dialect: "mssql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};