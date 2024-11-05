import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.config.js';

const User = sequelize.define('User', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
 },
 fullname: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
   isEmail: true,
  },
 },
 isSuperAdmin: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
 },
 passwordResetToken: {
  type: DataTypes.STRING,
  allowNull: true,
 },
 passwordResetExpires: {
  type: DataTypes.DATE,
  allowNull: true,
 },
 created_at: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
 },
});

// Hash password before saving
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;
