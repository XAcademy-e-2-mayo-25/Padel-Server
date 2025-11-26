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
    console.log('Usuario existente encontrado:', user.idUsuario, user.email);
  } else {
    const resultado = await this.usuariosService.crearUsuario({
      email: profile.email,
      nombres: profile.nombres,
      apellidos: profile.apellidos,
      fotoPerfil: profile.fotoPerfil,
    });
    user = resultado.usuario;
    console.log('Usuario nuevo creado:', user.idUsuario, user.email);
  }

  // Generar JWT
  const payload = { sub: user.idUsuario, email: user.email };
  console.log('Payload para JWT:', payload);
  const token = this.jwtService.sign(payload);
  console.log('Token generado:', token.substring(0, 50) + '...');

  return { user, token };
}
}


