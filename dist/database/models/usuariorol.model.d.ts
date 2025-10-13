import { Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Usuario } from './usuario.model';
import { Rol } from './rol.model';
import { Estado } from './Estado.model';
export interface UsuarioRolAttributes {
    idUsuario: number;
    idRol: number;
    idEstado: number;
    descripcion: string | null;
}
export type UsuarioRolCreationAttributes = Optional<UsuarioRolAttributes, 'descripcion'>;
export declare class UsuarioRol extends Model<UsuarioRolAttributes, UsuarioRolCreationAttributes> implements UsuarioRolAttributes {
    idUsuario: number;
    idRol: number;
    idEstado: number;
    descripcion: string | null;
    usuario?: Usuario;
    rol?: Rol;
    estado?: Estado;
}
