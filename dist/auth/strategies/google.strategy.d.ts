import { VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/auth/config/google-oauth.config';
import type { ConfigType } from '@nestjs/config';
import { AuthService } from '../types/auth.service';
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private googleConfiguration;
    private authService;
    constructor(googleConfiguration: ConfigType<typeof googleOauthConfig>, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
