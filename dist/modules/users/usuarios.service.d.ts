import { Sequelize } from 'sequelize-typescript';
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRol } from '../../database/models/usuariorol.model';
import { UsuarioPosicion } from '../../database/models/usuarioposicion.model';
import { Rol } from '../../database/models/rol.model';
import { Estado } from '../../database/models/Estado.model';
import { Posicion } from '../../database/models/posicion.model';
import { UnbanUsuarioDto } from './dto/unban-usuario.dto';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { EditarPosicionesDto } from './dto/editar-posiciones.dto';
import { EditarRolesDto } from './dto/editar-roles.dto';
import { ListarUsuariosDto } from './dto/listar-usuarios.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BajaUsuarioDto } from './dto/baja-usuario.dto';
import { Categoria } from 'src/database/models/Categoria.model';
export declare class UsuariosService {
    private readonly usuarioModel;
    private readonly usuarioRolModel;
    private readonly usuarioPosModel;
    private readonly posicionModel;
    private readonly rolModel;
    private readonly estadoModel;
    private readonly categoriaModel;
    private readonly sequelize;
    constructor(usuarioModel: typeof Usuario, usuarioRolModel: typeof UsuarioRol, usuarioPosModel: typeof UsuarioPosicion, posicionModel: typeof Posicion, rolModel: typeof Rol, estadoModel: typeof Estado, categoriaModel: typeof Categoria, sequelize: Sequelize);
    findByEmail(email: string): Promise<Usuario | null>;
    crearUsuario(dto: CrearUsuarioDto): Promise<{
        mensaje: string;
        usuario: Usuario | null;
    }>;
    banUsuario(idUsuario: number, dto: BajaUsuarioDto): Promise<{
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
    unbanUsuario(idUsuario: number, dto: UnbanUsuarioDto): Promise<{
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
    editarUsuario(idUsuario: number, dto: EditarUsuarioDto): Promise<{
        mensaje: string;
        usuario: Usuario | null;
    }>;
    actualizarPosiciones(idUsuario: number, dto: EditarPosicionesDto): Promise<{
        mensaje: string;
        usuario: Usuario | null;
    }>;
    actualizarRoles(idUsuario: number, dto: EditarRolesDto): Promise<{
        mensaje: string;
        usuario: Usuario | null;
    }>;
    obtenerUsuario(idUsuario: number): Promise<Usuario>;
    listarUsuarios(q: ListarUsuariosDto): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        items: Usuario[];
    }>;
}
