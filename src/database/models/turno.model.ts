import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull,
  ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Club } from './club.model';
import { CanchaTurno } from './canchaTurno.model';

export interface TurnoAttributes {
  idTurno: number;
  idClub: number;
  fecha: string | null;      // FORMATO (YYYY-MM-DD)
  diaSemana: number | null;  // 0..6 o 1..7 A DEFINIR
  horaDesde: string;         // TIME
  horaHasta: string;         // TIME
}

export type TurnoCreationAttributes = Optional<
  TurnoAttributes,
  'idTurno' | 'fecha' | 'diaSemana'
>;

@Table({ tableName: 'Turno', timestamps: false })
export class Turno extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoAttributes {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idTurno: number;

  @AllowNull(false) @ForeignKey(() => Club) @Column(DataType.INTEGER) declare idClub: number;
  @BelongsTo(() => Club) club?: Club;

  @AllowNull(true)  @Column(DataType.DATEONLY) declare fecha: string | null;
  @AllowNull(true)  @Column(DataType.TINYINT)  declare diaSemana: number | null;

  @AllowNull(false) @Column(DataType.TIME) declare horaDesde: string;
  @AllowNull(false) @Column(DataType.TIME) declare horaHasta: string;

  @HasMany(() => CanchaTurno) canchasAsignadas?: CanchaTurno[];
}
