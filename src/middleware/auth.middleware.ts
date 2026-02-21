import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
/**
 * Extend Express Request
 */

interface LoginBody {
  email: string;
  password: string;
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  
if (!token) {
  throw new Error("No token provided");
}

  try {
 const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as unknown as JwtPayload & { userId: number };

const userId = decoded.userId;
decoded.userId;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
