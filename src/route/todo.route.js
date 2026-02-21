import { Router } from "express";
import { TodoController } from "../controller/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const routes = Router();
routes.post("/", authMiddleware, TodoController.create);
routes.get("/", authMiddleware, TodoController.getAll);
routes.put("/:id", authMiddleware, TodoController.update);
routes.delete("/:id", authMiddleware, TodoController.delete);
export default routes;
