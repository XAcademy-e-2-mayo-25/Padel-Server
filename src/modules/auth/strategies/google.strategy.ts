import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/services/auth/auth.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'yourClientID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'yourClientSecret',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'yourGoogleCallbackURL',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { name, emails, photos } = profile;

    // Crear o buscar usuario
    const user = await this.authService.validateGoogleUser({
      email: emails[0].value,
      nombres: name.givenName,
      apellidos: name.familyName,
      fotoPerfil: photos[0].value,
    });

    done(null, user);
  }
}
