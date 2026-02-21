import { Todo } from "../entity/Todo.js";
export declare class TodoService {
    private todoRepo;
    private userRepo;
    createTodo(title: string, userId: number): Promise<Todo>;
    getUserTodos(userId: number): Promise<Todo[]>;
    updateTodo(todoId: number, title: string, userId: number): Promise<Todo>;
    deleteTodo(todoId: number, userId: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=todo.service.d.ts.map