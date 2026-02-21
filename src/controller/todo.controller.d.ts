import type { Request, Response } from "express";
interface TodoBody {
    title: string;
}
export declare class TodoController {
    private static service;
    static create(req: Request<{}, {}, TodoBody>, res: Response): Promise<Response>;
    static getAll(req: Request, res: Response): Promise<Response>;
    static update(req: Request<{
        id: string;
    }, {}, TodoBody>, res: Response): Promise<Response>;
    static delete(req: Request<{
        id: string;
    }>, res: Response): Promise<Response>;
}
export {};
//# sourceMappingURL=todo.controller.d.ts.map