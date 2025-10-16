import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/modules/users/usuarios.service';
import { CrearUsuarioDto } from 'src/modules/users/dto/crear-usuario.dto';
export declare class AuthService {
    private UsuariosService;
    private jwtService;
    constructor(UsuariosService: UsuariosService, jwtService: JwtService);
    validarUsuarioPorEmail(email: string): Promise<{
        id: any;
        email: string;
        nombre: string;
    }>;
    login(usrId: number): string;
    validateUsuarioGoogle(usuario: CrearUsuarioDto): Promise<import("../../database/models/usuario.model").Usuario | {
        mensaje: string;
        usuario: import("../../database/models/usuario.model").Usuario | null;
    }>;
}
