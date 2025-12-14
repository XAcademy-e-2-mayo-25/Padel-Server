import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull,
  ForeignKey, BelongsTo, Unique
} from 'sequelize-typescript';
import { Club } from './club.model';
import { Cancha } from './cancha.model';
import { Turno } from './turno.model';

export interface CanchaTurnoAttributes {
  idCanchaTurno: number;
  idClub: number;
  idCancha: number;
  idTurno: number;
  disponible: boolean;
  precio: number;
}

export type CanchaTurnoCreationAttributes = Omit<CanchaTurnoAttributes, 'idCanchaTurno'>;

@Table({ tableName: 'CanchaTurno', timestamps: false })
export class CanchaTurno extends Model<CanchaTurnoAttributes, CanchaTurnoCreationAttributes>
  implements CanchaTurnoAttributes {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idCanchaTurno: number;

  @AllowNull(false) @ForeignKey(() => Club)   @Column(DataType.INTEGER) declare idClub: number;
  @AllowNull(false) @ForeignKey(() => Cancha) @Column(DataType.INTEGER) declare idCancha: number;
  @AllowNull(false) @ForeignKey(() => Turno)  @Column(DataType.INTEGER) declare idTurno: number;

  @AllowNull(false) @Column(DataType.BOOLEAN) declare disponible: boolean;
  @AllowNull(false) @Column(DataType.DECIMAL(10,2)) declare precio: number;

  @BelongsTo(() => Club)   club?: Club;
  @BelongsTo(() => Cancha) cancha?: Cancha;
  @BelongsTo(() => Turno)  turno?: Turno;

  // UNIQUE (idCancha, idTurno)
  @Unique('uq_cancha_turno')
  @Column(DataType.VIRTUAL) _uniq_dummy?: unknown;
}
