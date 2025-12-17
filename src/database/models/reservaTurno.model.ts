import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull,
  ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Cancha } from './cancha.model';
import { Usuario } from './usuario.model';

export interface ReservaTurnoAttributes {
  idReservaTurno: number;
  idCancha: number;
  idJugador: number;
  fecha: string;           // YYYY-MM-DD ISO
  slotIndexDesde: number;  // >= 0
  slotCount: number;       // >= 1
  pagado: boolean;         // default false
  precioAplicado: number;  // entero >= 0
}

export type ReservaTurnoCreationAttributes = Optional<
  ReservaTurnoAttributes,
  'idReservaTurno' | 'pagado'
>;

@Table({ tableName: 'ReservaTurno', timestamps: false })
export class ReservaTurno extends Model<ReservaTurnoAttributes, ReservaTurnoCreationAttributes> implements ReservaTurnoAttributes {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idReservaTurno: number;

  @AllowNull(false) @ForeignKey(() => Cancha) @Column(DataType.INTEGER) declare idCancha: number;
  @BelongsTo(() => Cancha) cancha?: Cancha;

  @AllowNull(false) @ForeignKey(() => Usuario) @Column(DataType.INTEGER) declare idJugador: number;
  @BelongsTo(() => Usuario) jugador?: Usuario;

  @AllowNull(false) @Column(DataType.DATEONLY)   declare fecha: string;
  @AllowNull(false) @Column(DataType.INTEGER)    declare slotIndexDesde: number;
  @AllowNull(false) @Column(DataType.INTEGER)    declare slotCount: number;

  @AllowNull(false) @Column(DataType.BOOLEAN)    declare pagado: boolean;
  @AllowNull(false) @Column(DataType.INTEGER)    declare precioAplicado: number;
}
