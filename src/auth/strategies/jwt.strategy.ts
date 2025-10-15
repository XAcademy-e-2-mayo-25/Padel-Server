import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-local";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwt-payload";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private jwtConfiguration: ConfigType<typeof jwtConfig>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: typeof jwtConfiguration.secret === "string" ? jwtConfiguration.secret : jwtConfiguration.secret?.toString()
        })
    }

    validate(payload: AuthJwtPayload){
        return { id: payload.sub}
    }
}   