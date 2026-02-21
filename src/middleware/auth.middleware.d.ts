import type { Request, Response, NextFunction } from "express";
export interface AuthMiddleware extends Request {
    userId?: number;
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map