import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Usuario } from './usuario.model';
import { Rol } from './rol.model';
import { Estado } from './Estado.model';

export interface UsuarioRolAttributes {
  idUsuario: number;
  idRol: number; //1=ADMINISTRADOR, 2=JUGADOR, 3=CLUB
  idEstado: number; // 1=PENDIENTE, 2=HABILITADO, 3=BANEADO
  descripcion: string | null;
}

export type UsuarioRolCreationAttributes = Optional<UsuarioRolAttributes, 'descripcion'>;


//Model para UsarioRol, PK compuesta por dos FK
@Table({ tableName: 'UsuarioRol', timestamps: false })
export class UsuarioRol extends Model<UsuarioRolAttributes, UsuarioRolCreationAttributes>
  implements UsuarioRolAttributes {
  @ForeignKey(() => Usuario) @PrimaryKey @Column(DataType.INTEGER) idUsuario!: number;
  @ForeignKey(() => Rol)     @PrimaryKey @Column(DataType.INTEGER) idRol!: number;

  @ForeignKey(() => Estado)  @Column(DataType.INTEGER) idEstado!: number;

  @AllowNull(true)
  @Column(DataType.STRING(300))
  descripcion!: string | null;

  @BelongsTo(() => Usuario) usuario?: Usuario;
  @BelongsTo(() => Rol) rol?: Rol;
  @BelongsTo(() => Estado) estado?: Estado;
}
