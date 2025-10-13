import { VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "src/auth/config/google-oauth.config";
import type { ConfigType } from '@nestjs/config';
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private googleConfiguration;
    constructor(googleConfiguration: ConfigType<typeof googleOauthConfig>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
