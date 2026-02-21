import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { AppDataSource } from "./database/data-source.js";
import authRoutes from "./route/auth.route.js";
import todoRoutes from "./route/todo.route.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
await AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
})
    .catch((error) => console.log("Database connection error:", error));
