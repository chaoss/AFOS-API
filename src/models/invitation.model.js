import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.config.js';
import User from './user.model.js';

const Invitation = sequelize.define('Invitation', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
 },
 inviter_id: {
  type: DataTypes.INTEGER,
  references: {
   model: User,
   key: 'id',
  },
 },
 invitee_email: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
   isEmail: true,
  },
 },
 isSuperAdmin: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
 },
 token: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 status: {
  type: DataTypes.ENUM('pending', 'accepted', 'expired'),
  defaultValue: 'pending',
 },
 expires_at: {
  type: DataTypes.DATE,
  allowNull: false,
 },
 created_at: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
 },
});

Invitation.belongsTo(User, { foreignKey: 'inviter_id', as: 'inviter' });

export default Invitation;
