import type { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";

interface TodoBody {
  title: string;
}

export class TodoController {
  private static service = new TodoService();

  static async create(
    req: Request<{}, {}, TodoBody>,
    res: Response
  ): Promise<Response> {
    try {
      const { title } = req.body;

      const todo = await TodoController.service.createTodo(
        title,
        req.userId
      );

      return res.status(201).json(todo);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Failed to create todo",
      });
    }
  }

  static async getAll(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const todos = await TodoController.service.getUserTodos(req.userId);
      return res.json(todos);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to fetch todos",
      });
    }
  }

  static async getUserById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const todo = await TodoController.service.getById(Number(id), req.userId);
      return res.json(todo);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Todo not found",
      });
    }
  }

  static async update(
    req: Request<{ id: string }, {}, TodoBody>,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const todo = await TodoController.service.updateTodo(
        Number(id),
        title,
        req.userId
      );

      return res.json(todo);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Todo not found",
      });
    }
  }

  static async delete(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;

      const result = await TodoController.service.deleteTodo(
        Number(id),
        req.userId
      );

      return res.json(result);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Todo not found",
      });
    }
  }
}
