import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Club } from './club.model';
import { CanchaTurno } from './canchaTurno.model';
import { Reserva } from './reserva.model';

export interface TurnoAttributes {
  idTurno: number;
  idClub: number;
  fecha: string | null;
  diaSemana: number | null;
  horaDesde: string;
  horaHasta: string;
}

export type TurnoCreationAttributes = Optional<TurnoAttributes, 'idTurno' | 'fecha' | 'diaSemana'>;

@Table({ tableName: 'Turno', timestamps: false })
export class Turno extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare idTurno: number;

  @AllowNull(false)
  @ForeignKey(() => Club)
  @Column(DataType.INTEGER)
  declare idClub: number;
  @BelongsTo(() => Club)
  club?: Club;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  declare fecha: string | null;

  @AllowNull(true)
  @Column(DataType.TINYINT)
  declare diaSemana: number | null;

  @AllowNull(false)
  @Column(DataType.TIME)
  declare horaDesde: string;

  @AllowNull(false)
  @Column(DataType.TIME)
  declare horaHasta: string;

  @HasMany(() => CanchaTurno)
  canchasTurno?: CanchaTurno[];

  @HasMany(() => Reserva)
  reservas?: Reserva[];
}
