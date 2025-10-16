import type { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwt-payload";
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtConfiguration;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>);
    validate(payload: AuthJwtPayload): {
        id: number;
    };
}
export {};
