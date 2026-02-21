import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source.js";
import { User } from "../entity/User.js";
export class AuthService {
    async register(email, password) {
        const userRepo = AppDataSource.getRepository(User);
        const existingUser = await userRepo.findOneBy({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepo.create({
            email,
            password: hashedPassword,
        });
        await userRepo.save(user);
        return { message: "User registered successfully" };
    }
    async login(email, password) {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token };
    }
}
