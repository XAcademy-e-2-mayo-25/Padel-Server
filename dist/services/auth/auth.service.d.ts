import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/modules/users/usuarios.service';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validateGoogleUser(profile: {
        email: string;
        nombres: string;
        apellidos: string;
        fotoPerfil?: string;
    }): Promise<{
        user: any;
        token: string;
    }>;
}
