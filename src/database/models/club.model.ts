import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Unique,
  ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Usuario } from './usuario.model';
import { Estado } from './Estado.model';
import { Cancha } from './cancha.model';
import { DatosPago } from './datosPago.model';

export interface ClubAttributes {
  idClub: number;
  idUsuario: number;
  razonSocial: string | null;
  nombreFantasia: string | null;
  cuitCuil: string;
  provincia: string;
  localidad: string;
  direccion: string;
  idEstadoClub: number;
}

export type ClubCreationAttributes = Optional<
  ClubAttributes,
  'idClub' | 'razonSocial' | 'nombreFantasia'
>;

@Table({ tableName: 'Club', timestamps: false })
export class Club extends Model<ClubAttributes, ClubCreationAttributes> implements ClubAttributes {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idClub: number;

  @AllowNull(false) @ForeignKey(() => Usuario) @Column(DataType.INTEGER) declare idUsuario: number;
  @BelongsTo(() => Usuario) usuario?: Usuario;

  @AllowNull(true)  @Column(DataType.STRING(150)) declare razonSocial: string | null;
  @AllowNull(true)  @Column(DataType.STRING(150)) declare nombreFantasia: string | null;

  @AllowNull(false) @Unique @Column(DataType.STRING(20)) declare cuitCuil: string;

  @AllowNull(false) @Column(DataType.STRING(50))  declare provincia: string;
  @AllowNull(false) @Column(DataType.STRING(100)) declare localidad: string;
  @AllowNull(false) @Column(DataType.STRING(300)) declare direccion: string;

  @AllowNull(false) @ForeignKey(() => Estado) @Column(DataType.INTEGER) declare idEstadoClub: number;
  @BelongsTo(() => Estado) estado?: Estado;

  @HasMany(() => Cancha) canchas?: Cancha[];
  @HasMany(() => DatosPago) datosPagos?: DatosPago[];
}