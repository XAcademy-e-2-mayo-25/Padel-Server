import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Usuario } from './usuario.model';
import { Posicion } from './posicion.model';

export interface UsuarioPosicionAttributes {
  idUsuario: number;
  idPosicion: number;
}
export type UsuarioPosicionCreationAttributes = UsuarioPosicionAttributes; // no opcionales

@Table({ tableName: 'UsuarioPosicion', timestamps: false })
export class UsuarioPosicion extends Model<UsuarioPosicionAttributes, UsuarioPosicionCreationAttributes>
  implements UsuarioPosicionAttributes {
  @ForeignKey(() => Usuario) @PrimaryKey @Column(DataType.INTEGER) idUsuario!: number;
  @ForeignKey(() => Posicion) @PrimaryKey @Column(DataType.INTEGER) idPosicion!: number;

  //con belongTo podemos acceder al usuario y posicion con el id UsuarioPosicion
  @BelongsTo(() => Usuario) usuario?: Usuario;
  @BelongsTo(() => Posicion) posicion?: Posicion;
}
