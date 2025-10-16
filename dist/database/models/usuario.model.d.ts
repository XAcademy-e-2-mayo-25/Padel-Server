import { Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Categoria } from './Categoria.model';
import { UsuarioRol } from './usuariorol.model';
import { UsuarioPosicion } from './usuarioposicion.model';
export interface UsuarioAttributes {
    idUsuario: number;
    nombres: string;
    apellidos: string;
    dni: string | null;
    email: string;
    fotoPerfil: string | null;
    provincia: string | null;
    localidad: string | null;
    idCategoria: number | null;
}
export type UsuarioCreationAttributes = Optional<UsuarioAttributes, 'idUsuario' | 'dni' | 'fotoPerfil' | 'provincia' | 'localidad' | 'idCategoria'>;
export declare class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
    idUsuario: number;
    nombres: string;
    apellidos: string;
    dni: string | null;
    email: string;
    fotoPerfil: string | null;
    provincia: string | null;
    localidad: string | null;
    idCategoria: number | null;
    categoria?: Categoria;
    roles?: UsuarioRol[];
    posiciones?: UsuarioPosicion[];
}
