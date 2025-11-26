import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';


//Model para tabla Rol
@Table({ tableName: 'Rol', timestamps: false })
export class Rol extends Model<Rol> {
  @PrimaryKey @Column(DataType.INTEGER) idRol!: number;
  @Column(DataType.STRING) nombre!: string;
}
