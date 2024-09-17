import { DataTypes, Sequelize } from 'sequelize';
import { sequelizeInstance } from '../../Utils/DbConnector/sequelize';
import { USERS_TABLE } from '../../Config/table';

export const UserSchema = {
  uid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: false,
  },
  mobile: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  pwd_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pwd_salt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  roles:{
    type: DataTypes.STRING(100),
    allowNull: true,
  
  }
};

export default sequelizeInstance.define(USERS_TABLE, UserSchema, {
  timestamps: true,
  createdAt: 'created_on',
  updatedAt: 'updated_on',
});
