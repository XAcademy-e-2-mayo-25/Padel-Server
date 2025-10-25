import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/modules/users/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: { email: string; nombres: string; apellidos: string; fotoPerfil?: string }) {
  // Buscar usuario usando el método público
  const existente = await this.usuariosService.findByEmail(profile.email);

  let user;
  if (existente) {
    user = existente;
  } else {
    user = await this.usuariosService.crearUsuario({
      email: profile.email,
      nombres: profile.nombres,
      apellidos: profile.apellidos,
      fotoPerfil: profile.fotoPerfil,
    });
  }

  // Generar JWT
  const payload = { sub: user.idUsuario, email: user.email };
  const token = this.jwtService.sign(payload);

  return { user, token };
}
}


