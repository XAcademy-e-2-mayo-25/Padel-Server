import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';


//Model para tabla Estado
@Table({ tableName: 'Estado', timestamps: false })
export class Estado extends Model<Estado> {
  @PrimaryKey @Column(DataType.INTEGER) idEstado!: number;
  @Column(DataType.STRING) descripcion!: string;
}
