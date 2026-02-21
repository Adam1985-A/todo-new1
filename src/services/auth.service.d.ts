export declare class AuthService {
    register(email: string, password: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map