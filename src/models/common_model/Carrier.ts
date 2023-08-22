import { Table, Column, Model, HasOne, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  modelName: 'Carrier',
  tableName: 'carriers',
  timestamps: false, // Disable timestamps
})

class Carrier extends Model {
  @Column({
    type: DataTypes.STRING
  })
  code: string;

  @Column({
    type: DataTypes.STRING
  })
  carrier_name: string;

  @Column({
    type: DataTypes.STRING
  })
  abbr: string;

}

export default Carrier;