import { AppDataSource } from "../database/data-source.js";
import { Todo } from "../entity/Todo.js";
import { User } from "../entity/User.js";

export class TodoService {
  private todoRepo = AppDataSource.getRepository(Todo);
  private userRepo = AppDataSource.getRepository(User);


  async createTodo(title: string, userId: number) {
    

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    const todo = this.todoRepo.create({ title, user });
    return this.todoRepo.save(todo);
  }

  async getUserTodos(userId: number) {
    return this.todoRepo.find({
      where: { user: { id: userId } },
      order: { id: "DESC" },
    });
  }

  async getById(todoId: number, userId: number) {
    const todo = await this.todoRepo.findOne({
      where: { id: todoId, user: { id: userId } },
    });
    if (!todo) throw new Error("Todo not found");
    return todo;
  }

  async updateTodo(
    todoId: number,
    title: string,
    userId: number
  ) {
    const todo = await this.todoRepo.findOne({
      where: { id: todoId, user: { id: userId } },
    });

    if (!todo) throw new Error("Todo not found");

    todo.title = title;
    return this.todoRepo.save(todo);
  }

  async deleteTodo(todoId: number, userId: number) {
    const todo = await this.todoRepo.findOne({
      where: { id: todoId, user: { id: userId } },
    });

    if (!todo) throw new Error("Todo not found");

    await this.todoRepo.remove(todo);
    return { message: "Todo deleted successfully" };
  }
}
