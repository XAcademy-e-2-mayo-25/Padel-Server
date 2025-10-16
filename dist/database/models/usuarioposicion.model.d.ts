import { Model } from 'sequelize-typescript';
import { Usuario } from './usuario.model';
import { Posicion } from './posicion.model';
export interface UsuarioPosicionAttributes {
    idUsuario: number;
    idPosicion: number;
}
export type UsuarioPosicionCreationAttributes = UsuarioPosicionAttributes;
export declare class UsuarioPosicion extends Model<UsuarioPosicionAttributes, UsuarioPosicionCreationAttributes> implements UsuarioPosicionAttributes {
    idUsuario: number;
    idPosicion: number;
    usuario?: Usuario;
    posicion?: Posicion;
}
