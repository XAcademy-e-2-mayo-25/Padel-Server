import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';


//Model para tabla Categoria
@Table({ tableName: 'Categoria', timestamps: false })
export class Categoria extends Model<Categoria> {
  @PrimaryKey @Column(DataType.INTEGER) idCategoria!: number;
  @Column(DataType.STRING) nombre!: string;
}
