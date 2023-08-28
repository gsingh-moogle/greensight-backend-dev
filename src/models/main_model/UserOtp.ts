import { Table, Column, Model, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
@Table({
  modelName: 'User_otps',
  tableName: 'user_otps'
})
class UserOtp extends Model {
  @Column({
    type: DataTypes.INTEGER
  })
  user_id: number;

  @Column({
    type: DataTypes.STRING
  })
  otp: string;

  @Column({
    type: DataTypes.INTEGER
  })
  status: number;
}
export default UserOtp;