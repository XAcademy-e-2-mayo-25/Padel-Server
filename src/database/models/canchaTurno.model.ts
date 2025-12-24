import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Club } from './club.model';
import { Cancha } from './cancha.model';
import { Turno } from './turno.model';
import { Reserva } from './reserva.model';

export interface CanchaTurnoAttributes {
  idCanchaTurno: number;
  idClub: number;
  idCancha: number;
  idTurno: number;
  disponible: boolean;
  precio: number;
}

export type CanchaTurnoCreationAttributes = Optional<
  CanchaTurnoAttributes,
  'idCanchaTurno' | 'disponible' | 'precio'
>;

@Table({ tableName: 'CanchaTurno', timestamps: false })
export class CanchaTurno
  extends Model<CanchaTurnoAttributes, CanchaTurnoCreationAttributes>
  implements CanchaTurnoAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare idCanchaTurno: number;

  @AllowNull(false)
  @ForeignKey(() => Club)
  @Column(DataType.INTEGER)
  declare idClub: number;
  @BelongsTo(() => Club)
  club?: Club;

  @AllowNull(false)
  @ForeignKey(() => Cancha)
  @Column(DataType.INTEGER)
  declare idCancha: number;
  @BelongsTo(() => Cancha)
  cancha?: Cancha;

  @AllowNull(false)
  @ForeignKey(() => Turno)
  @Column(DataType.INTEGER)
  declare idTurno: number;
  @BelongsTo(() => Turno)
  turno?: Turno;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  declare disponible: boolean;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @HasMany(() => Reserva)
  reservas?: Reserva[];
}
