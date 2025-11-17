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
    // 1) Buscar si ya existe el usuario por email
    const existente = await this.usuariosService.findByEmail(profile.email);

    let user; // este va a ser SIEMPRE un Usuario (modelo Sequelize)

    if (existente) {
      // Si ya existe, usamos ese
      user = existente;
    } else {
      // Si no existe, lo creamos
      const creado = await this.usuariosService.crearUsuario({
        email: profile.email,
        nombres: profile.nombres,
        apellidos: profile.apellidos,
        fotoPerfil: profile.fotoPerfil,
        // el resto de campos del DTO quedan como opcionales / null
      });

      // OJO: crearUsuario devuelve { mensaje, usuario }
      user = creado.usuario;
    }

    // 2) Armar el payload del JWT
    const payload = {
      sub: user.idUsuario,   // subject del token
      email: user.email,     // lo usamos después en req.user.email
    };

    // 3) Firmar el token
    const token = this.jwtService.sign(payload);

    // 4) Devolver usuario y token al controlador de auth
    return { user, token };
  }
}

