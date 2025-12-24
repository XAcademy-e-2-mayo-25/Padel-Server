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
  bio: string | null;
  provincia: string | null;
  localidad: string | null;
  idCategoria: number | null;

  telefono: string | null;
  direccion: string | null;
}

//campos opcionales al momento de crear un Usuario
export type UsuarioCreationAttributes = Optional<
  UsuarioAttributes,
  'idUsuario' | 'dni' | 'fotoPerfil' | 'bio' | 'provincia' | 'localidad' | 'idCategoria' | 'telefono' | 'direccion'
>;


//Model para tabla Usuario
@Table({ tableName: 'Usuario', timestamps: false })
export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes {
    //PK
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idUsuario: number;
    //Campos no nullos y nulos
  @AllowNull(false) @Column(DataType.STRING(100)) declare nombres: string;
  @AllowNull(false) @Column(DataType.STRING(100)) declare apellidos: string;
  @AllowNull(true)  @Column(DataType.STRING(20))  declare dni: string | null;
  @AllowNull(false) @Unique @Column(DataType.STRING(160)) declare email: string;
  @AllowNull(true)  @Column(DataType.STRING(255)) declare fotoPerfil: string | null;
  @AllowNull(true)  @Column(DataType.STRING(500)) declare bio: string | null;
  @AllowNull(true)  @Column(DataType.STRING(80))  declare provincia: string | null;
  @AllowNull(true)  @Column(DataType.STRING(120)) declare localidad: string | null;

  @AllowNull(true)  @Column(DataType.STRING(20)) declare telefono: string | null;
  @AllowNull(true)  @Column(DataType.STRING(255)) declare direccion: string | null;
    //FK
  @ForeignKey(() => Categoria) @Column(DataType.INTEGER) declare idCategoria: number | null;
  @BelongsTo(() => Categoria) categoria?: Categoria;
    //Relaciones con tablas que poseen una referencia por FK a la tabla usuarios
    //con hasmany indicamos que el id de un usuario puede tener varias referencias en usuarioRol y usuarioPosicion
  @HasMany(() => UsuarioRol) roles?: UsuarioRol[];
  @HasMany(() => UsuarioPosicion) posiciones?: UsuarioPosicion[];
}
