import { Table, Column, Model, HasOne, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  modelName: 'Company',
  tableName: 'company'
})

class Company extends Model {
  @Column({
    type: DataTypes.STRING
  })
  name: string;

  @Column({
    type: DataTypes.STRING
  })
  db_name: string;

  @Column({
    type: DataTypes.STRING
  })
  logo: string;

  @Column({
    type: DataTypes.INTEGER
  })
  status: number;

}

export default Company;