import { Table, Column, Model, HasOne, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import UserCompany from "./UserCompany";
import User from "./User";

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
  db_alias: string;

  @Column({
    type: DataTypes.STRING
  })
  logo: string;

  @Column({
    type: DataTypes.INTEGER
  })
  status: number;

  @BelongsToMany(() => User, () => UserCompany)
  users?: User[];

}

export default Company;