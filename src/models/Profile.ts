import { Table, Column, Model, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  modelName: 'Profile',
  tableName: 'profile'
})
class User extends Model {
  @Column({
    type: DataTypes.STRING
  })
  first_name: string;

  @Column({
    type: DataTypes.STRING
  })
  last_name: string;

  @Column({
    type: DataTypes.INTEGER
  })
  user_id: number;

  @Column({
    type: DataTypes.STRING
  })
  county_code: string;

  @Column({
    type: DataTypes.STRING
  })
  phone_number: string;

  @Column({
    type: DataTypes.STRING
  })
  image: string;
}

export default User;