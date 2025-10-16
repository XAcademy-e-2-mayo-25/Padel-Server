import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        id: any;
        token: string;
    }>;
    googleLogin(): void;
    googleCallback(req: any): Promise<void>;
}
