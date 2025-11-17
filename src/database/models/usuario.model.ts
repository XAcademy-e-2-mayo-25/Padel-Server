//utilidades para definir modelos sequelize a ts
import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Unique,
  ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Categoria } from './Categoria.model';
import { UsuarioRol } from './usuariorol.model';
import { UsuarioPosicion } from './usuarioposicion.model';

//interface para representar los campos de la tabla Usuario
export interface UsuarioAttributes {
  idUsuario: number;
  nombres: string;
  apellidos: string;
  dni: string | null;
  email: string;
  fotoPerfil: string | null;
  provincia: string | null;
  localidad: string | null;
  idCategoria: string | null;

  telefono: string | null;
  direccion: string | null;
}

//campos opcionales al momento de crear un Usuario
export type UsuarioCreationAttributes = Optional<
  UsuarioAttributes,
  'idUsuario' | 'dni' | 'fotoPerfil' | 'provincia' | 'localidad' | 'idCategoria' | 'telefono' | 'direccion'
>;


//Model para tabla Usuario
@Table({ tableName: 'Usuario', timestamps: false })
export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes {
    //PK
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) idUsuario!: number;
    //Campos no nullos y nulos
  @AllowNull(false) @Column(DataType.STRING(100)) nombres!: string;
  @AllowNull(false) @Column(DataType.STRING(100)) apellidos!: string;
  @AllowNull(true)  @Column(DataType.STRING(20))  dni!: string | null;
  @AllowNull(false) @Unique @Column(DataType.STRING(160)) email!: string;
  @AllowNull(true)  @Column(DataType.STRING(255)) fotoPerfil!: string | null;
  @AllowNull(true)  @Column(DataType.STRING(80))  provincia!: string | null;
  @AllowNull(true)  @Column(DataType.STRING(120)) localidad!: string | null;

  @AllowNull(true)  @Column(DataType.STRING(20)) telefono!: string | null;
  @AllowNull(true)  @Column(DataType.STRING(255)) direccion!: string | null;
    //FK
  @ForeignKey(() => Categoria) @Column(DataType.STRING(20)) idCategoria!: string | null;
  @BelongsTo(() => Categoria) categoria?: Categoria;
    //Relaciones con tablas que poseen una referencia por FK a la tabla usuarios
    //con hasmany indicamos que el id de un usuario puede tener varias referencias en usuarioRol y usuarioPosicion
  @HasMany(() => UsuarioRol) roles?: UsuarioRol[];
  @HasMany(() => UsuarioPosicion) posiciones?: UsuarioPosicion[];
}
