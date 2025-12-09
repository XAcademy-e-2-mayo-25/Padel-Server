import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull,
  ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Club } from './club.model';

export interface DatosPagoAttributes {
  idDatosPago: number;
  idClub: number;
  metodoPago: string;
  cbu: string | null;
  cvu: string | null;
  alias: string | null;
  dniCuitCuil: string | null;
  titular: string | null;
  banco: string | null;
  tipoCuenta: string | null;
  numeroCuenta: string | null;
  activo: boolean;
}

export type DatosPagoCreationAttributes = Optional<
  DatosPagoAttributes,
  'idDatosPago' | 'cbu' | 'cvu' | 'alias' | 'dniCuitCuil' | 'titular' | 'banco' | 'tipoCuenta' | 'numeroCuenta'
>;

@Table({ tableName: 'DatosPago', timestamps: false })
export class DatosPago extends Model<DatosPagoAttributes, DatosPagoCreationAttributes> implements DatosPagoAttributes {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare idDatosPago: number;

  @AllowNull(false) @ForeignKey(() => Club) @Column(DataType.INTEGER) declare idClub: number;
  @BelongsTo(() => Club) club?: Club;

  @AllowNull(false) @Column(DataType.STRING(80)) declare metodoPago: string;

  @AllowNull(true)  @Column(DataType.STRING(22)) declare cbu: string | null;
  @AllowNull(true)  @Column(DataType.STRING(22)) declare cvu: string | null;
  @AllowNull(true)  @Column(DataType.STRING(60)) declare alias: string | null;
  @AllowNull(true)  @Column(DataType.STRING(20)) declare dniCuitCuil: string | null;
  @AllowNull(true)  @Column(DataType.STRING(150)) declare titular: string | null;
  @AllowNull(true)  @Column(DataType.STRING(80)) declare banco: string | null;
  @AllowNull(true)  @Column(DataType.STRING(50)) declare tipoCuenta: string | null;
  @AllowNull(true)  @Column(DataType.STRING(30)) declare numeroCuenta: string | null;

  @AllowNull(false) @Column(DataType.BOOLEAN) declare activo: boolean;
}
