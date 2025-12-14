import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull,
  ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Club } from './club.model';
import { CanchaTurno } from './canchaTurno.model';

export interface CanchaAttributes {
  idCancha: number;
  idClub: number;
  denominacion: string;
  cubierta: boolean | null;
  observaciones: string | null;
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

  @HasMany(() => CanchaTurno) turnosAsignados?: CanchaTurno[];
}
