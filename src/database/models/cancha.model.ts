import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull,
  ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Club } from './club.model';
import { ReservaTurno } from './reservaTurno.model';

export interface CanchaAttributes {
  idCancha: number;
  idClub: number;
  denominacion: string;
  cubierta: boolean | null;
  observaciones: string | null;

  // nuevos campos de calendario/reglas
  diasSemana: number;           // bitmask 0..6 (Dom..Sab)
  horaDesde: string;            // TIME (HH:mm[:ss])
  horaHasta: string;            // TIME (HH:mm[:ss])
  rangoSlotMinutos: number;     // 30 o 60
  precio: number;               // entero > 0
}

export type CanchaCreationAttributes = Optional<
  CanchaAttributes,
  'idCancha' | 'cubierta' | 'observaciones'
>;

@Table({ tableName: 'Cancha', timestamps: false })
export class Cancha extends Model<CanchaAttributes, CanchaCreationAttributes> implements CanchaAttributes {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idCancha: number;

  @AllowNull(false) @ForeignKey(() => Club) @Column(DataType.INTEGER) declare idClub: number;
  @BelongsTo(() => Club) club?: Club;

  @AllowNull(false) @Column(DataType.STRING(200)) declare denominacion: string;

  @AllowNull(true)  @Column(DataType.BOOLEAN)     declare cubierta: boolean | null;
  @AllowNull(true)  @Column(DataType.STRING(300)) declare observaciones: string | null;

  // nuevos campos
  @AllowNull(false) @Column(DataType.TINYINT)     declare diasSemana: number;
  @AllowNull(false) @Column(DataType.TIME)        declare horaDesde: string;
  @AllowNull(false) @Column(DataType.TIME)        declare horaHasta: string;
  @AllowNull(false) @Column(DataType.SMALLINT)    declare rangoSlotMinutos: number;
  @AllowNull(false) @Column(DataType.INTEGER)     declare precio: number;

  // relaciones nuevas
  @HasMany(() => ReservaTurno) reservas?: ReservaTurno[];
}
