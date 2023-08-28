import { Table, Column, Model, HasOne, BelongsTo, ForeignKey , BelongsToMany} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from "./User";
import Company from "./Company";

@Table({
  modelName: 'UserCompany',
  tableName: 'user_company'
})
class UserCompany extends Model {
  @ForeignKey(() => Company)
  @Column({
    type: DataTypes.INTEGER
  })
  company_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER
  })
  user_id: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Company)
  company!: Company;
}

export default UserCompany;