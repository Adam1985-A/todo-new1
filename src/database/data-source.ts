import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { User } from "../entity/User.js";
import { Todo } from "../entity/Todo.js";

const databaseUrl = process.env.DATABASE_URL  //production ready 

if(!databaseUrl){
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  ssl: process.env.NODE_ENV === "production" 
  ? { rejectUnauthorized: false } 
  : false,
  entities: [
    process.env.NODE_ENV === "production"
    ? "dist/entity/*.js"
    : "src/entity/*.ts"
  ], 
  migrations: [],
  subscribers: [],
});


export default AppDataSource;