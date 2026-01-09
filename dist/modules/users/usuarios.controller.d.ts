import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BajaUsuarioDto } from './dto/baja-usuario.dto';
import { UnbanUsuarioDto } from './dto/unban-usuario.dto';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { EditarPosicionesDto } from './dto/editar-posiciones.dto';
import { EditarRolesDto } from './dto/editar-roles.dto';
import { ListarUsuariosDto } from './dto/listar-usuarios.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    crear(dto: CrearUsuarioDto): Promise<{
        mensaje: string;
        usuario: import("../../database/models/usuario.model").Usuario | null;
    }>;
    debug(body: any): {
        recibido: any;
    };
    banear(id: string, dto: BajaUsuarioDto): Promise<{
        idUsuario: number;
        rolesBaneados: number;
        idRol?: undefined;
        estado?: undefined;
    } | {
        idUsuario: number;
        idRol: number | undefined;
        estado: string;
        rolesBaneados?: undefined;
    }>;
    desbanear(id: string, dto: UnbanUsuarioDto): Promise<{
        idUsuario: number;
        rolesHabilitados: number;
        idRol?: undefined;
        estado?: undefined;
    } | {
        idUsuario: number;
        idRol: number | undefined;
        estado: string;
        rolesHabilitados?: undefined;
    }>;
    editar(id: number, dto: EditarUsuarioDto): Promise<{
        mensaje: string;
        usuario: import("../../database/models/usuario.model").Usuario | null;
    }>;
    actualizarPosiciones(id: number, dto: EditarPosicionesDto): Promise<{
        mensaje: string;
        usuario: import("../../database/models/usuario.model").Usuario | null;
    }>;
    actualizarRoles(id: number, dto: EditarRolesDto): Promise<{
        mensaje: string;
        usuario: any;
    }>;
    obtenerUno(id: number): Promise<import("../../database/models/usuario.model").Usuario>;
    listar(query: ListarUsuariosDto): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        items: import("../../database/models/usuario.model").Usuario[];
    }>;
    felicidades(req: any): {
        mensaje: string;
        usuario: any;
    };
}
