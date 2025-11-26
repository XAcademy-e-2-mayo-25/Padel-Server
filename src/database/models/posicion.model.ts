import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';


//Model para tabla Posicion
@Table({ tableName: 'Posicion', timestamps: false })
export class Posicion extends Model<Posicion> {
  @PrimaryKey @Column(DataType.INTEGER) idPosicion!: number;
  @Column(DataType.STRING) nombre!: string;
}
