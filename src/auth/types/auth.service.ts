import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './auth-jwt-payload';
import { UsuariosService } from 'src/modules/users/usuarios.service';
import { CrearUsuarioDto } from 'src/modules/users/dto/crear-usuario.dto';


@Injectable()
export class AuthService {
  constructor(private UsuariosService: UsuariosService, private jwtService:JwtService) {}

  async validarUsuarioPorEmail(email: string) {
    const usr = await this.UsuariosService.obtenerUsuarioPorEmail(email);
    if (!usr) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return {
      id: usr.id,
      email: usr.email,
      nombre: usr.nombres,
    };
  }

  login(usrId:number){
    const payload:AuthJwtPayload = {
        sub:usrId
    };
    return this.jwtService.sign(payload)
  }

      async validateUsuarioGoogle(usuario: CrearUsuarioDto) {
        const usr = await this.UsuariosService.obtenerUsuarioPorEmail(usuario.email);
        
        if (usr) return usr;
        return await this.UsuariosService.crearUsuario(usuario);
    }
}
