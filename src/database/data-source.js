import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User.js";
import { Todo } from "../entity/Todo.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "saidat1985",
    database: "todo-new1",
    synchronize: true,
    logging: false,
    entities: [User, Todo], // 👈 THIS FIXES YOUR ERROR
});
export default AppDataSource;
