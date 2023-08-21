import { Table, Column, Model, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Profile from "./Profile";


@Table({
  modelName: 'User',
  tableName: 'users'
})
class User extends Model {
  @Column({
    type: DataTypes.STRING
  })
  name: string;

  @Column({
    type: DataTypes.STRING
  })
  email: string;

  @Column({
    type: DataTypes.STRING
  })
  password: string;

  @Column({
    type: DataTypes.INTEGER,
    comment: '0 => substain login, 1 => region login'
  })
  role: number;

  @Column({
    type: DataTypes.INTEGER,
    comment: 'login count of user'
  })
  status: number;

  @HasOne(() => Profile, 'user_id')
  profile?: Profile;

}



export default User;