import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Usuario } from './usuario.model';
import { Club } from './club.model';
import { Cancha } from './cancha.model';
import { Turno } from './turno.model';
import { CanchaTurno } from './canchaTurno.model';

export type ReservaEstado = 'pendiente' | 'confirmada' | 'cancelada' | 'finalizada';

export interface ReservaAttributes {
  idReserva: number;
  idUsuario: number;
  idClub: number;
  idCancha: number;
  idTurno: number;
  idCanchaTurno: number;
  fechaReserva: string;
  precio: number;
  estado: ReservaEstado;
  pagada: boolean;
  metodoPago: string | null;
  observaciones: string | null;
}

export type ReservaCreationAttributes = Optional<
  ReservaAttributes,
  'idReserva' | 'estado' | 'pagada' | 'metodoPago' | 'observaciones'
>;

@Table({ tableName: 'Reserva', timestamps: false })
export class Reserva extends Model<ReservaAttributes, ReservaCreationAttributes>
  implements ReservaAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare idReserva: number;

  @AllowNull(false)
  @ForeignKey(() => Usuario)
  @Column(DataType.INTEGER)
  declare idUsuario: number;
  @BelongsTo(() => Usuario)
  usuario?: Usuario;

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
  @ForeignKey(() => CanchaTurno)
  @Column(DataType.INTEGER)
  declare idCanchaTurno: number;
  @BelongsTo(() => CanchaTurno)
  canchaTurno?: CanchaTurno;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  declare fechaReserva: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @AllowNull(false)
  @Default('pendiente')
  @Column(DataType.STRING(20))
  declare estado: ReservaEstado;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  declare pagada: boolean;

  @AllowNull(true)
  @Column(DataType.STRING(80))
  declare metodoPago: string | null;

  @AllowNull(true)
  @Column(DataType.STRING(500))
  declare observaciones: string | null;
}
