import { AuthService } from "../types/auth.service";
declare const LocalStrategy_base: new (...args: any) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<{
        id: any;
        email: string;
        nombre: string;
    }>;
}
export {};
