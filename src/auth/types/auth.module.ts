import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import googleOauthConfig from 'src/auth/config/google-oauth.config';
import { GoogleStrategy } from '../strategies/google.strategy';
import { GoogleAuthGuard } from '../guards/google-auth/google-auth.guard';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, GoogleAuthGuard],
})
export class AuthModule {}
