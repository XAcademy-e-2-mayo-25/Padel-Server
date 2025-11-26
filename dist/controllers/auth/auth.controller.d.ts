import { AuthService } from 'src/services/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifyToken(req: any): {
        valid: boolean;
        id: any;
        email: any;
    };
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<any>;
}
