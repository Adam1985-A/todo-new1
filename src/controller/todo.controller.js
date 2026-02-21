import { TodoService } from "../services/todo.service.js";
export class TodoController {
    static async create(req, res) {
        try {
            const { title } = req.body;
            const todo = await this.service.createTodo(title, req.userId);
            return res.status(201).json(todo);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Failed to create todo",
            });
        }
    }
    static async getAll(req, res) {
        try {
            const todos = await this.service.getUserTodos(req.userId);
            return res.json(todos);
        }
        catch (error) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "Failed to fetch todos",
            });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const todo = await this.service.updateTodo(Number(id), title, req.userId);
            return res.json(todo);
        }
        catch (error) {
            return res.status(404).json({
                message: error instanceof Error ? error.message : "Todo not found",
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.deleteTodo(Number(id), req.userId);
            return res.json(result);
        }
        catch (error) {
            return res.status(404).json({
                message: error instanceof Error ? error.message : "Todo not found",
            });
        }
    }
}
TodoController.service = new TodoService();
