import { AuthService } from "../services/auth.service.js";
export class AuthController {
    static async register(req, res) {
        try {
            const service = new AuthService();
            const { email, password } = req.body;
            const result = await service.register(email, password);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async login(req, res) {
        try {
            const service = new AuthService();
            const { email, password } = req.body;
            const result = await service.login(email, password);
            res.json(result);
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    }
}
