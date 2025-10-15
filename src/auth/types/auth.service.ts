import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './auth-jwt-payload';

@Injectable()
export class AuthService {
  constructor(private UsuariosService: UsuariosService, private jwtService:JwtService) {}

  async validarUsuarioPorId(idUsuario: string) {
    const usr = await this.UsuariosService.obtenerUsuario(idUsuario);

    if (!usr) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return {
      id: usr.id,
      email: usr.email,
      nombre: usr.nombre,
    };
  }

  login(usrId:number){
    const payload:AuthJwtPayload = {
        sub:usrId
    };
    return this.jwtService.sign(payload)
  }
}
