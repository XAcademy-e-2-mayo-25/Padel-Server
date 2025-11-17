import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'yourGoogleClientID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'yourGoogleClientSecret',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'yourCallbackURL',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;

    // usamos optional chaining para evitar TypeError
    const email = emails?.[0]?.value;
    const nombres = name?.givenName || '';
    const apellidos = name?.familyName || '';
    const fotoPerfil = photos?.[0]?.value || null;

    // Si por algún motivo Google no devuelve email, cortamos acá
    if (!email) {
      return done(new Error('No se pudo obtener el email de Google'), null as any);
    }

    // Crear o buscar usuario + generar token
    const userWithToken = await this.authService.validateGoogleUser({
      email,
      nombres,
      apellidos,
      fotoPerfil,
    });

    // Esto queda en req.user en el controlador
    return done(null, userWithToken as any);
  }
}

